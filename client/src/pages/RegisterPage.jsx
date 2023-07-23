import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";


export default function RegisterPage(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function registerUser(ev){
        ev.preventDefault();

        try{
            await axios.post('/register',{
                name,
                email,
                password,
            });
            setRedirect(true);
        }catch(e){
            alert('Registration not successful, Please try again');
        }
    }

    if(redirect){
        return <Navigate to={'/login'} />
    }

    return(
        <div className="-mt-20 flex flex-col min-h-screen items-center justify-center">
            <h2 className="mb-4 text-xl">Register</h2>
            <form className="register flex flex-col gap-3 w-96" onSubmit={registerUser}>
                <input className="" type="text" 
                    placeholder={'John Doe'}
                    value={name}
                    onChange={(ev)=> setName(ev.target.value)} 
                />
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
                <button className="">Register</button>
                <div className="text-center text-xs">
                    Don't have an account yet?
                    <Link className="pl-2 text-red-500" to={'/login'}>Login</Link>
                </div>
            </form>
        </div>
    );
}