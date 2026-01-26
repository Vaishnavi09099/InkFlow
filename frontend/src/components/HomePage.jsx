import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';


const HomePage = () => {
    const [blogs,setBlogs] = useState([]);
    async function fetchBlogs(){
        let res = await axios.get("http://localhost:3000/api/v1/blogs")
        console.log(res.data.blogs);
        setBlogs(res.data.blogs);
    }

    useEffect(()=>{
        fetchBlogs();
    },[])
  return (
    <div className='w-[60%]'>
       { blogs.map(blog => (

        <Link to={"blog/" + blog.blogId}>
           <div key={blog._id} className='w-full my-20 flex justify-between'>
            <div className='w-[60%] flex flex-col gap-2'>
                <div>
                    <img src=""></img>
                    <p>{blog.creator.name}</p>
                </div>
                
               
                <h2 className='font-bold text-3xl'>{blog.title}</h2>
                <h4 className='line-clamp-2'>{blog.description}</h4>
                <div className='flex gap-5'>
                    <p>{blog.createdAt}</p>
                    <p>500</p>
                    <p>200</p>
                </div>
            </div>
            <div className='w-[25%]'>
                <img src={blog.image}></img>
            </div>
        </div>
        </Link>

        ))
    }

     
    </div>
  )
}

export default HomePage