import React from 'react'
import {  Route , Routes } from 'react-router-dom';
import Login from './Component/Login/Login';
import Home from './Component/Home/home';
import AuthReq from './Component/AuthReq';

 const App = () => {
  return (
    <div className='bg-[#f5f5f5]' >

   
      <Routes> 
      <Route path="/"  element={<Login/>} /> 
      <Route path="/home" element={<AuthReq><Home /></AuthReq>} /> {/* Update usage of AuthReq */}
      </Routes>
   

    </div>
  )
}
export default App;