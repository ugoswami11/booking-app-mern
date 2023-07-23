import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlaceGallery from "../components/PlaceGallery";
import {format,differenceInCalendarDays} from "date-fns";

export default function BookingPage(){
    const {id} = useParams();
    const [bookingData, setBookingsData] = useState('');
    useEffect(()=>{
        async function fetchData(){
            if(id){
                const response = await axios.get('/bookings');
                const foundBooking =response.data.find(({_id}) => _id === id);
                console.log(foundBooking);
                if(foundBooking){
                    setBookingsData(foundBooking);
                }
            }
        }
        fetchData();
    },[id]);

    if(!bookingData){
        return '';
    }

    return(
        <div className="my-8">
            <h1 className="text-2xl">{bookingData.place.title}</h1>
            <a className="flex  gap-1 my-2 block font-semibold underline" target="_blank" href={"https://maps.google.com/?q="+bookingData.place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {bookingData.place.address} 
            </a>
            <div className="flex justify-between items-center bg-gray-200 p-4 mb-4 rounded-2xl border-t border-gray-300">
                <div className="">
                    <div className="text-lg">
                        Your booking information:
                    </div>
                    <div className="mt-4 flex gap-1">
                        <div className="flex gap-1 items-center text-sm md:text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                            {differenceInCalendarDays(new Date(bookingData.checkOut),new Date(bookingData.checkIn))} nights
                        </div>
                        <div className="flex gap-1 text-sm md:text-lg pl-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                            {format(new Date(bookingData.checkIn),'yyyy-MM-dd')}
                            <span className="px-2">&rarr;</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                            {format(new Date(bookingData.checkOut),'yyyy-MM-dd')}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-red-400 rounded-2xl p-4 text-white flex flex-col items-center">
                        <h3>Total price</h3>
                        <p>₹{bookingData.price}</p>
                    </div>
                </div>
            </div>
            
     
            <PlaceGallery place={bookingData.place}/>
        </div>
    );
}