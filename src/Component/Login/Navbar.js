import React from 'react'

 const Navbar = () => {
  return (
    <div className='flex  justify-between lg:w-9/12 pt-4' >
        <a href='/index' className='lg:w-[12%] w-4/12 lg:ml-6  ml-2 '> 
            <img src='/images/login-logo.svg' alt='log' /> 
        </a>
        <div className='flex gap-8'> 
            <button type='button' className='text-[#adb5bd] py-2 lg:px-4 md:px-4   hover:bg-[#dee2e6] text-black ' > Join Now 
            </button>
            <button button='button' className='border-2 lg:p-2 lg:px-6 md:px-4 rounded-full text-[#0a66c2] border-[#0a66c2] font-bold hover:bg-[#d0ebff] ' > Sing in </button> 
        </div>
    </div>
  )
}
export default Navbar;
