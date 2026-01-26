import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';


function BlogPage() {
  const { id } = useParams();
  const [blogData,setBlogData] = useState(null);

  async function fetchBlogById() {
    try {
          const token = JSON.parse(localStorage.getItem("token"));

       const res = await axios.get(
      `http://localhost:3000/api/v1/blogs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      setBlogData(res.data.blog);
       toast.success(res.data.message);
    } catch (err) {
      console.log(err);
        toast.error("err.response.data.message");
    }
  }

  useEffect(() => {
   fetchBlogById();
  }, []);

  return <div>
    {
      blogData ? <div className='min-w-[1000px]'>
        <h1 className='mt-10 font-bold text-6xl'>{blogData.title}</h1>
        <h2 className='my-5 text-3xl'>{blogData.creator.name}</h2>
        <img src={blogData.image}></img>
        
        </div> : <h1>Loading.......</h1>
    }
  </div>;
}

export default BlogPage;
