const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Place = require('./models/Place.js');
const Bookings = require('./models/Bookings.js');

const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = "vXsRP6m3NUOu5sRhvXsRP6m3NUOu5sRh";

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(express.json());

mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_URL);

app.get("/test", function(req, res){
    res.json("Test");
});

function getUserDataFromToken(req){
    return new Promise((resolve, reject) =>{
        jwt.verify(req.cookies.token, secret, {}, async (err, cookieData)=>{
            if(err){
                res.json(err);
            }else{
                resolve(cookieData);
            }
        });
    })
}

app.post("/register", async function(req, res){
    const{name, email, password} = req.body;

    try{
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    }catch(e){
        res.status(422).json(e);
    }
    
});

app.post("/login", async function(req, res){
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});

    if(userDoc){
        let passOk = bcrypt.compareSync(password, userDoc.password, salt);

        if(passOk){
            jwt.sign({email: userDoc.email, id: userDoc._id}, secret, {}, (err, token)=>{
                if(err){
                    console.log('User not logged in');
                }else{
                    res.cookie('token', token).json(userDoc);
                } 
            })
        }
        else{
            res.status(422).json('Incorrect password');
        }
    }
    else{
        res.status(422).json("User doesn't exist");
    }    
});

app.get('/profile', function(req, res){
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, secret, {}, async (err, cookieData)=>{
            if(err){
                res.json(err);
            }else{
                const {name, email,_id} = await User.findById(cookieData.id);
                res.json({name, email, _id});
            }
        });
    }else{
        res.json(null);
    }
});

app.post('/logout', function(req, res){
    res.cookie('token','').json('logged out');
});

app.post('/upload-by-link', async function(req, res){
    const {link} = req.body;
    const newName = Date.now() +'.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname+ '/uploads/' + newName,
    });
    res.json(newName);
});

const photosMiddleware = multer({dest:'uploads'});
app.post('/upload', photosMiddleware.array('photos',20) ,function(req, res){
    const uploadedFiles = [];

    for(let i=0; i<req.files.length; i++){
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        const newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\',''));
        // uploadedFiles.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedFiles);    
});

app.post('/places', function(req, res){
    const {token} = req.cookies;
    const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;
    jwt.verify(token, secret, {}, async (err, cookieData)=>{
        if(err){
            res.json(err);
        }else{
            const placeDoc =  await Place.create({
                owner: cookieData.id,
                title, 
                address, 
                photos: addedPhotos, 
                description, 
                perks, 
                extraInfo, 
                checkIn, 
                checkOut, 
                maxGuests,
                price,
            });
            res.json(placeDoc);
        }
    });
});

app.get('/user-places', function(req, res){
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, cookieData)=>{
        if(err){
            res.json(err);
        }else{
            const {id} = cookieData;
            res.json(await Place.find({owner:id}));
        }
    });
});

app.get('/places/:id', async function(req, res){
    const {id} = req.params;
    res.json(await Place.findById(id));
    // res.json(id);
});

app.put('/places', async function(req, res){
    const {token} = req.cookies;
    const {id, title, address, addedPhotos, 
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests, price} = req.body;
    
    
    jwt.verify(token, secret, {}, async (err, cookieData)=>{
        if(err){
            res.json(err);
        }else{
            const placeDoc = await Place.findById(id);
            if(cookieData.id === placeDoc.owner.toString()){
                placeDoc.set({
                    title, address, photos: addedPhotos, 
                    description, perks, extraInfo, 
                    checkIn, checkOut, maxGuests, price
                });
                await placeDoc.save();
                res.json('ok');
            }
        }
    });
    
});

app.get('/places', async function(req, res){
    res.json(await Place.find());
});

app.post('/bookings', async function(req, res){
    const userData = await getUserDataFromToken(req);
    const {place, checkIn, checkOut, guests, fullname, phone,price} = req.body;
    try{
        const bookingDoc = await Bookings.create({
            place, 
            checkIn, 
            checkOut, 
            guests, 
            phone,
            fullname,
            price,
            user:userData.id,
        });
        res.json(bookingDoc);
    }catch(err){
        console.log(err);
    }

});

app.get('/bookings', async function(req, res){
    const userData = await getUserDataFromToken(req);
    res.json(await Bookings.find({user:userData.id}).populate('place'));
});

app.listen(4000, ()=>{
    console.log("Listening on port 4000");
});