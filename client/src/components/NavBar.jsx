import React from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';


const NavBar = () => {
  const{ openSignIn } = useClerk()
  const {user} = useUser()
  const navigate = useNavigate()
  const {setShowRecruiterLogin} = useContext(AppContext)
  return (
    <div className='w-full fixed top-0 left-0 bg-white shadow z-30'>
      <div className='flex items-center justify-between px-10 py-0 h-[80px] shadow'>
      <img onClick={()=> navigate('/')} src={assets.jobifylogo} alt=" "  className="cursor-pointer h-20 w-30" />
       {
        user
        ?<div className='flex items-center gap-3'>
          <Link to={'/applications'}> Applied Jobs </Link>
          <p>|</p>
          <p>Hi, {user.firstName + " " + user.lastName}</p>
          <UserButton />


        </div>
        :<div className='flex items-center gap-4'>
        <button onClick={e => setShowRecruiterLogin(true)} className= 'cursor-pointer text-sm font-medium text-gray-700'> Recruiter Login </button>
        <button onClick={ e => openSignIn() }   
       className="cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-full">Login</button>
      </div>
       }
      </div>
     
    </div>
  );
};

export default NavBar;
