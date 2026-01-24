import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import AuthForm from './pages/authForm'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import AddBlog from './pages/AddBlog'



function App() {
 

  return (
    <div className='bg-slate-400 h-screen w-screen'>
   <Routes>
    <Route path="/" element={<Navbar />}>
    
      <Route path="/signin" element={<AuthForm type={"signin"}/>}></Route>
      <Route path="/" element={<HomePage/>}></Route>
    <Route path="/signup" element={<AuthForm  type={"signup"} />}></Route>
    <Route path="/add-blog" element={<AddBlog/>}></Route>
    
    </Route>
  
   </Routes>
   </div>
  )
}

export default App;
