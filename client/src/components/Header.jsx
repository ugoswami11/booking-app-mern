import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function Header(){
  const {user} = useContext(UserContext);

  return(
      <header className='p-4 flex justify-between'>
        <Link to={"/"} className='flex items-center gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-9 md:h-9 w-6 h-6 text-red-400 -rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          <span className='text-lg md:text-xl text-red-400 font-bold'>booking</span>   
        </Link>
        <div className='text-xs md:text-sm py-1 pl-4 pr-1 flex gap-2 items-center border border-gray-300 rounded-full shadow-md shadow-500'>
          <button className=''>Anywhere</button>
          <span className='border-l border-gray-300 h-8'></span>
          <button className='px-1 py-1'>Any week</button>
          <span className='border-l border-gray-300 h-8'></span>
          <button className='text-gray-400 px-1 py-1'>Add guests</button>
          <button className='bg-red-400 border rounded-full p-1.5 '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
        <Link to={ user?'/account': '/login'} className='text-sm py-1 px-3 flex gap-2 items-center border border-gray-300 rounded-full'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-5 md:h-5 w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          { !!user &&(
            <p className="text-xs md:text-sm">{user.name}</p>
          )}
        </Link>
      </header>
  );
}