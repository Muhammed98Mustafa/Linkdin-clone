import React, { useEffect } from 'react'
import Navbar from './Navbar';
import {singinWithGoogle} from "../../Feature/UserSlice"
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


 const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogin} = useSelector(state => state.users) ;

  useEffect(()=>{
    if(userLogin){
      navigate("/home")
    }
  } , [userLogin   , navigate])

  const handleGoogleSignIn = () => {
    dispatch(singinWithGoogle({}));
  };
  return (
    <> 
    
    <div>
        <Navbar/> 
        <div className='lg:flex lg:flex-row flex flex-col gap-8'> 
        <div className=' flex-1  lg:mt-0 pt-12 ' > 
            <div className='lg:flex-none flex flex-col justify-center items-center'> 
            <h1 className='text-[#2977c9] lg:text-6xl md:text-3xl text-xl ml-4 font-medium lg:mt-28 lg:ml-28 leading-4 '> Welcome to your professional community </h1>
            <button onClick={handleGoogleSignIn}  className='flex flex-row  lg:px-20 py-2 md:px-8 px-4   rounded-full  lg:mt-20 mt-8 border-2 border-black hover: bg-white hover:bg-[#f5f5f5] '> 
               <img src='/images/google.svg' alt='Google'/> 
                Sing In With Google 
             </button>
             </div>
        </div>
        <div className='flex-1 lg:mt-20'>
        <img  src="/images/login-hero.svg" alt="logintable" />
        </div> 
        </div>
    </div>
    </>
  )
}
export default  Login ;
