import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from "axios"



function AddBlog(){
    const token = JSON.parse(localStorage.getItem("token"));
    const navigate = useNavigate();
    const [blogData,setBlogData] = useState({
        title:"",
        description :"",
        image:null,
    })

    async function handlePostBlog(){
       try{

        const res = await axios.post("http://localhost:3000/api/v1/blogs",
            blogData,
            {
                headers:{
                    "Content-Type" : "multipart/form-data",
                    Authorization : `Bearer ${token}`
                }
            }
        )
        toast.success(res.data.message);
        navigate("/")
       }
       catch(error){
        toast.error(error.response.data.message)
       }
    }

    // useEffect(()=>{
    //     if(!token){
    //         return navigate("/signin")
    //     }
    // },[])

    return token==null ? (<Navigate to={"/signIn"}/>) : (
        <div className='w-[500px]'>
            <label >Title</label>
            <input type="text" placeholder='title' onChange={(e)=>setBlogData((blogData) => ({...blogData, title:e.target.value}))}/>
            <br />
            <label>Description</label>
            <input type="text"  placeholder='description' onChange={(e)=>setBlogData((blogData) => ({...blogData, description:e.target.value}))}/>
             <br />

            <label htmlFor='image' className=''>
                {blogData.image ? (
                    <img src={URL.createObjectURL(blogData.image)} className='aspect-video object-cover' alt ="" /> 
                ):( <div className='bg-black aspect-video flex justify-center items-center'>Select Image</div>
           )}
                </label>
            <input className='hidden'  id="image" type="file" accept =".png, .jpg, .jpeg" onChange={(e)=>setBlogData((blogData) => ({...blogData, image:e.target.files[0]
              }))}/>
             <br />
             <button onClick={handlePostBlog}>Post Blog</button>

        </div>
    )
    
}

export default AddBlog