import { useEffect, useState } from "react";
import PhotoUploader from "../components/PhotoUploader";
import AddPerks from "../components/AddPerks";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";


export default function PlacesFormPage(){ 
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState('100');
    const [redirectForm, setRedirectForm] = useState(false);

    useEffect(()=>{
        async function fetchData(){
            if(!id){
                return;
            }
            const {data} = await axios.get('/places/'+id);
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        }
        fetchData();
    },[id]);

    async function savePlace(ev){
        ev.preventDefault();
        const placesdata = {
            title, address, addedPhotos,
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests,price
        };

        if(id){
            await axios.put('/places',{id, ...placesdata});
            setRedirectForm(true);
        }
        else{    
            await axios.post('/places',placesdata);
            setRedirectForm(true);
        }
    }
    if(redirectForm){
        return <Navigate to={'/account/places'}/>
    }

    return(
        <>
            <div>
                <AccountNav/>
                <form onSubmit={savePlace} className="list-accomodation m-5 max-w-2xl  flex flex-col mx-auto">
                    <div>
                        <label>Title <span>Provide some cathcy title to your listing</span></label>
                        <input type="text" value={title} onChange={ev=> setTitle(ev.target.value)} placeholder={"Title"}/>
                    </div>
                    <div>
                        <label>Address <span>Enter your full address</span></label>
                        <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder={"Address"}/>
                    </div>
                    <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                    <div>
                        <label>Description <span>Enter detailed description about your listing</span></label>
                        <textarea className="p-2 w-full border border-gray-400 rounded-xl" rows="6" value={description} onChange={ev=> setDescription(ev.target.value)}></textarea>
                    </div>
                    <div>
                        <label>Perks <span>Select all the perks that is available</span></label>
                    </div>
                    <AddPerks selected={perks} onChange={setPerks}/>
                    <div>
                        <label>Extra info <span>Add extra info for your accomodation</span></label>
                        <textarea className="p-2 w-full border border-gray-400 rounded-xl" rows="10" value={extraInfo} onChange={ev=> setExtraInfo(ev.target.value)}></textarea>
                    </div>
                    <div>
                        <label>Timings & Max guests <span>Add max guests, check in and check out times</span></label>
                        <div className="timings grid grid-cols-2 gap-x-8 gap-y-2">
                            <div className="grid grid-cols-2 flex">
                                <label>Check In Time</label>
                                <input type="text" value={checkIn} onChange={ev=> setCheckIn(ev.target.value)} placeholder={"13"}/>
                            </div>
                            <div className="grid grid-cols-2 flex">
                                <label>Check Out Time</label>
                                <input type="text" value={checkOut} onChange={ev=> setCheckOut(ev.target.value)} placeholder={"18"} />
                            </div>
                            <div className="grid grid-cols-2 flex">
                                <label>Max Guests</label>
                                <input type="text" value={maxGuests} onChange={ev=> setMaxGuests(ev.target.value)} placeholder={"4"}/>
                            </div>
                            <div className="grid grid-cols-2 flex">
                                <label>Price per night</label>
                                <input type="text" value={price} onChange={ev=> setPrice(ev.target.value)} placeholder={"100"}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="text-white bg-red-400 w-full p-2 border rounded-2xl my-4">Save</button>
                    </div>
                </form>
            </div>
        </>
    );
}