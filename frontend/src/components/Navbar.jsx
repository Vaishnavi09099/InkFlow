import React from 'react'
import { Outlet } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <div className='w-full h-full flex flex-col items-center  text-white overflow-x-hidden'>
         <div className='w-full flex-none bg-amber-400 h-[30px] '>Navbar</div>
     <Outlet />

    </div>
    
    </>
   
  )
}

export default Navbar