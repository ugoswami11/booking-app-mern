const mongoose  = require('mongoose')
const {Schema} = mongoose;

const placeSchema = new Schema({
    owner: {type:Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price:Number,
});

const PlaceModel = mongoose.model('places', placeSchema);

module.exports = PlaceModel;