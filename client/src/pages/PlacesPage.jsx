import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";


export default function PlacesPage(){
    const [places, setPlaces] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const {data} = await axios.get('/user-places');
            setPlaces(data);
        }
        fetchData();
    },[])

    return(
        <div>
            <AccountNav/>
            <div className="flex justify-center">
                <Link className="p-2 bg-red-400 border rounded-full flex justify-center text-white gap-1" to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                    Add new places
                </Link>
            </div>
            <div className="mt-6">
                {places.length >0 && places.map(place =>(
                    <Link to={'/account/places/'+place._id} key={place} className="flex cursor-pointer gap-4 bg-gray-100 border mx-5 rounded-xl items-center my-4" >
                        <div className="pl-2 h-36 w-40 overflow-hidden grow shrink-0 rounded-xl flex items-center">
                            {place.photos.length >0 && (
                                <img className="w-full object-cover rounded-xl" src={"http://localhost:4000/uploads/"+place.photos[0]} alt="" />
                            )}
                        </div>
                        <div className="grow-0 shrink pr-2">
                            <h2 className="text-lg">{place.title}</h2>
                            <p className="text-xs my-2 text-gray-500">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>        
    );
}