import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react'



function App() {
  const [userData,setUserData] = useState({
    name: "" ,
    email:"",
    password:"",
  })

  const [blogs,setBlogs] = useState([])

  async function fetchBlogs(){
    let data = await fetch("http://localhost:3000/api/v1/blogs");
    let res = await data.json();
    console.log(res.blog);
    setBlogs(res.blog || res.blogs)
  }

  useEffect(()=>{
    fetchBlogs();
  },[])

  async function handleSubmit(){
    let data = await fetch('http://localhost:3000/api/v1/users',{
      method:'POST',
      body:JSON.stringify(userData),
      headers:{
      "Content-type": "application/json"
      }

    })

    let res = await data.json()
    alert(res.message);
    
  }
  return (
    <div>
      <h1>Sign up</h1>
      <div>
        <input 
        onChange={(e)=>
          setUserData((prev)=>({
            ...prev,
            name:e.target.value,
          }))
        }
        
        type="text" placeholder='name' />
        <br />
        <br />
        <input 
        onChange={(e)=>
          setUserData((prev)=>({
            ...prev,
            email:e.target.value,
          }))
        }
        
        type="text" placeholder='email' />
          <br />
        <br />
        <input 
        onChange={(e)=>setUserData((prev)=>({
          ...prev,
          password:e.target.value
        }))}
        
        type="text" placeholder='password' />
      </div>
        <br />
        <br />
      <button onClick={handleSubmit}>Submit</button>



<div>
  {
        blogs.map(blog =>(
          <ul>
            <li>{blog.title}</li>
            <li>{blog.description}</li>
          </ul>
        ))
      }
</div>
      
    </div>
    
  )
}

export default App
