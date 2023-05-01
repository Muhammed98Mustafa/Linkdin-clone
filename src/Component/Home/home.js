import React from 'react'
import Header from './Header';
import LeftSide from './Sectoin/LeftSide';
import Main from './Sectoin/Main';
import RightSide from './Sectoin/RightSide';
import "./Header.css"


 const Home = () => {
  return (
    <div >
     <Header/>
     <div className='box-content text-center underline lg:flex lg:flex-row lg:justify-center flex flex-col py-12'> 
     <h5 className='text-blue-700 '> 
          <button type='button' className=''>Hiring in a hurry? - </button>
        </h5>
        <p className='font-bold'>
          Find talented pros in record time with Upwork and keep business
          moving.
        </p>
     </div>
     <section className='sectiongrid' > 
    <LeftSide className="leftside"/>
    <Main className="main"/>
    <RightSide className="rightside"/>


     </section>
    </div>
  )

}

export default Home ;