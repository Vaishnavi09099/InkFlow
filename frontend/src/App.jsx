import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [userData,setUserData] = useState({
    name: "" ,
    email:"",
    password:"",
  })


  async function handleSumbit(){
    let data = await fetch('http://localhost:3000/users',{
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
      <button onClick={handleSumbit}>Submit</button>
    </div>
  )
}

export default App
