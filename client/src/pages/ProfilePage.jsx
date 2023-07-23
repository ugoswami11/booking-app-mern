import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";


export default function ProfilePage(){
    const {user, ready, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const {subpage} = useParams();

    if(ready && !user){
        return <Navigate to={'/login'}/>
    }

    async function logout(){
        await axios.post('/logout');
        setUser(null);
        setRedirect(true);
    }
  
    if(redirect){
        return <Navigate to={'/'} />
    }

    return(
    <>
        <div>
            <AccountNav/>
            {subpage === undefined &&(
                <div className="text-center max-w-lg mx-auto">
                    <p className="">Logged in as {user.name} ({user.email})</p>
                    <button className="mt-5 p-2 bg-red-400 rounded-full text-white" onClick={logout}>Logout</button>
                </div>
            )}
            {subpage === 'places' &&(
                <PlacesPage/>
            )}
        </div>
    </>
    );
}