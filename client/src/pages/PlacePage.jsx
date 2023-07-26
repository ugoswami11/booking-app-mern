import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";

export default function PlacePage(){
    const {id} = useParams();
    const [place, setPlace] = useState('');
    // const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(()=>{
        async function fetchData(){
            if(!id){
                return;
            }
            const {data} = await axios.get(`/places/${id}`);
            setPlace(data);
        }
        fetchData();
    },[id])

    if(!place) return '';

    

    return(
        <div className="mt-4 bg-gray-100 px-8 pt-8">
            <h1 className="text-2xl">{place.title}</h1>
            <a className="flex gap-1 my-2 block font-semibold underline" target="_blank" href={"https://maps.google.com/?q="+place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {place.address} 
            </a>
            <PlaceGallery place={place} />
            <div className="mt-8 mb-8 gap-8 grid md:grid-cols-[2fr_1fr] grid-cols-1">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    <b>Check-in:</b> {place.checkIn}:00 <br/>
                    <b>Check-out:</b> {place.checkOut}:00 <br/>
                    <b>Max number of guests:</b> {place.maxGuests}
                    
                </div>
                <BookingWidget place={place}/>
            </div>
            <div className="bg-white px-8 py-2 border-t">
                <div className="mt-6">
                    <h2 className="font-semibold text-2xl">Extra info</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                    {place.extraInfo}
                </div>
            </div>
        </div>
    )
}