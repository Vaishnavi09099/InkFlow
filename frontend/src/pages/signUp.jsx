import React from 'react'

const Signup = () => {
    async function handleRegister(e){
        e.preventdefault();
        alert("okbro");

    }
  return (
    <div className='w-[20%] flex flex-col items-center gap-5'>
        <h1 className='text-3xl'>SignUp</h1>
        <form className='w-[100%] flex flex-col items-center gap-5'>
        <input 
        type="text" 
        className="w-full h-[50px] text-white text-xl p-2 rounded-md focus:outline-none bg-gray-500"
        placeholder='enter your name'
        />
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
        <button onClick={handleRegister} className='w-[100px] h-[50px] text-white text-xl p-2 rounded-md focus:outline-none bg-gray-500'>
           Register
        </button>
        </form>

    </div>
  )
}

export default Signup;