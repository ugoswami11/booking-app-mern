import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";


export default function BookingWidget({place}){
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [fullname, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirectBooking, setRedirectBooking] = useState('');
    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(user){
            setFullName(user.name);
        }
    },[user]);

    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookPlaces(){
        const bookingData = {checkIn, checkOut, guests, fullname, phone, place:place._id, price: numberOfNights*place.price}
        const response = await axios.post('/bookings',bookingData);
        const bookingId = response.data._id;
        setRedirectBooking(`/account/bookings/${bookingId}`);
    }

    if(redirectBooking){
        return <Navigate to={redirectBooking}/>
    }

    return(
        <div>
            <div className="bg-white shadow p-4 rounded-xl">
                <div className="text-xl text-center mb-4">
                    ₹{place.price} / per night
                </div>
                <div className="border rounded-2xl">
                    <div className="flex justify-around">
                        <div className="py-3 px-4 flex flex-col">
                            <label className="text-center">Check in:</label>
                            <input value={checkIn} onChange={ev=> setCheckIn(ev.target.value)} className="text-center border border-gray-300 rounded-lg" type="date"/>
                        </div>
                        <div className="py-3 px-4 border-l flex flex-col">
                            <label className="text-center">Check out</label>
                            <input value={checkOut} onChange={ev=> setCheckOut(ev.target.value)} className="text-center border border-gray-300 rounded-lg" type="date"/>
                        </div>
                    </div>
                    <div className="py-3 px-4 border-t flex justify-around">
                        <label>Number of Guests</label>
                        <input value={guests} onChange={ev=> setGuests(ev.target.value)} className="w-24 text-center border border-gray-300 rounded-lg" type="text"/>
                    </div>
                    {numberOfNights>0 &&(
                    <div className="py-3 px-4 border-t flex flex-col justify-around">
                        <label>Full name</label>
                        <input value={fullname} onChange={ev=> setFullName(ev.target.value)} className="px-2 h-8 border border-gray-300 rounded-lg" type="text"/>
                        <label>Phone Number</label>
                        <input value={phone} onChange={ev=> setPhone(ev.target.value)} className="px-2 h-8 border border-gray-300 rounded-lg" type="tel"/>
                    </div>
                    )}
                </div>
                <button onClick={bookPlaces} className="text-white bg-red-400 w-full p-2 border rounded-2xl my-4">
                    Book this place
                    {numberOfNights>0 &&(
                        <span> for ₹{numberOfNights*place.price}</span>
                    )}
                </button>
            </div>
        </div>
    )
}