import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser] = useState({});
    const [ready, setReady] = useState(false);

    useEffect(()=>{
        const fetchProfile = async () =>{
            const {data} = await axios.get('/profile')
            setUser(data);
            setReady(true);
        }
        fetchProfile();
    },[])

    return(
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    );
} 