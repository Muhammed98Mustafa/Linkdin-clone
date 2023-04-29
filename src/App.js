import React from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Login from './Component/Login/Login';
import Home from './Component/Home/home';
 const App = () => {
  return (
    <div >

      <BrowserRouter > 
      <Routes> 
      <Route path="/"  element={<Login/>} /> 
      <Route path="/home" element={<Home/>} />
      </Routes>
      </BrowserRouter> 

    </div>
  )
}
export default App;