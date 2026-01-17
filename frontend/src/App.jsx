
import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import SignUp from './pages/signUp'
import SignIn from './pages/signIn'
import CreateBlogs from './components/CreateBlogs'







function App() {
  return (
    <Routes>
      <Route path="/blogs" element={<Blogs/>}></Route>
      <Route path="/signUp" element={<SignUp/>}></Route>
      <Route path="/signIn" element={<SignIn />}></Route>
       <Route path="/create-blog" element={<CreateBlogs />}></Route>
       <Route path="*" element={<h1>Kya kar raha hai bhai tu</h1>}></Route>
    </Routes>
  )
  
}

export default App
