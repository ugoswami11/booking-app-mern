import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";


export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function LoginUser(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('/login',{
                email,
                password,
            });
            setUser(data);
            alert('Login successful');
            setRedirect(true);
        }catch(e){
            console.log(e);
            alert('Login failed!')
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return(
        <div className="-mt-20 flex flex-col min-h-screen items-center justify-center">
            <h2 className="mb-4 text-xl">Login</h2>
            <form className="login flex flex-col gap-3 w-96" onSubmit={LoginUser}>
                <input className="" type="email" 
                    placeholder={'youremail@email.com'}
                    value={email}
                    onChange={(ev)=> setEmail(ev.target.value)} 
                />
                <input className="" type="password" 
                    placeholder={'password'}
                    value={password}
                    onChange={(ev)=> setPassword(ev.target.value)} 
                />
                <button className="">Login</button>
                <div className="text-center text-xs">
                    Don't have an account yet?
                    <Link className="pl-2 text-red-500" to={'/register'}>Register</Link>
                </div>
            </form>
        </div>
    );
}