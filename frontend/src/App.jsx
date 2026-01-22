import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'


function App() {
 

  return (
    <div className='bg-slate-700 h-screen w-screen flex justify-center items-center'>
   <Routes>
    <Route path="/"></Route>
    <Route path="/signin" element={<Signin/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
   </Routes>
   </div>
  )
}

export default App;
