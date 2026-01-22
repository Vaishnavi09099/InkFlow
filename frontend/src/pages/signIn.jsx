import React from 'react'

const Signin = () => {
  return (
    <div className='w-[20%] flex flex-col items-center gap-5'>
        <h1 className='text-3xl'>SignIn</h1>
        <input 
        type="email" 
        className="w-full h-[50px] text-white text-xl p-2 rounded-md focus:outline-none bg-gray-500"
        placeholder='enter your email'
        />
        <input 
        type="password" 
        className="w-full h-[50px] text-white text-xl p-2 rounded-md focus:outline-none bg-gray-500"
        placeholder='enter your password'
        />
        <button className='w-[100px] h-[50px] text-white text-xl p-2 rounded-md focus:outline-none bg-gray-500'>
            Log In
        </button>

    </div>
  )
}

export default Signin;