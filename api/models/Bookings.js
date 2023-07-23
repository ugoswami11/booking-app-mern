const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'places'},
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
    checkIn: {type:Date, required:true},
    checkOut: {type:Date, required:true},
    guests: {type:Number, required:true},
    fullname: {type:String, required:true},
    phone: {type:String, required:true},
    price: Number,
});

const BookingModel = mongoose.model('Bookings', bookingSchema);

module.exports = BookingModel;