import React from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Login from './Component/Login/Login';
 const App = () => {
  return (
    <div >

      <BrowserRouter > 
      <Routes> 
      <Route path="/"  element={<Login/>} /> 
      </Routes>
      </BrowserRouter> 

    </div>
  )
}
export default App;