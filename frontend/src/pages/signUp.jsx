import React from "react";
import { useEffect } from "react";
import { useState } from "react";


function SignUp(){
    const [userData,setUserData] = useState({
    name: "" ,
    email:"",
    password:"",
  })

 
  async function handleSubmit(e){
     e.preventDefault();
    let data = await fetch('http://localhost:3000/api/v1/users',{
      method:'POST',
      body:JSON.stringify(userData),
      headers:{
      "Content-type": "application/json"
      }

    })

    let res = await data.json()
    if(res.success){
    localStorage.setItem("user",JSON.stringify(res.user));
    }
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
 
</div>
      
    </div>
    
 
  )
}

export default SignUp;