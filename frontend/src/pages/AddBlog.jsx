import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"




function AddBlog(){
    const {id} = useParams();
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
    async function handleUpdateBlog(){
       try{

        const res = await axios.patch("http://localhost:3000/api/v1/blogs/"+id,
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



    async function fetchBlogById() {
    try {
          

      let res = await axios.get(
  `http://localhost:3000/api/v1/blogs/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


      setBlogData({
        title: res.data.blog.title,
        description:res.data.blog.description,
        image:res.data.blog.image,
      }
        
      );
       toast.success("Blog fetched successfully");
    } catch (err) {
      console.log(err);
        toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    if(id){
   fetchBlogById();
    }
  }, [id]);

    // useEffect(()=>{
    //     if(!token){
    //         return navigate("/signin")
    //     }
    // },[])

  if (!token) {
  return <Navigate to="/signIn" />;
}

return (
  <div className='w-[500px]'>
    <label>Title</label>
    <input
      type="text"
      placeholder="title"
      value={blogData.title}
      onChange={(e) =>
        setBlogData({ ...blogData, title: e.target.value })
      }
    />

    <br />

    <label>Description</label>
    <input
      type="text"
      placeholder="description"
      value={blogData.description}
      onChange={(e) =>
        setBlogData({ ...blogData, description: e.target.value })
      }
    />

    <br />

    <label htmlFor="image">
      {blogData.image ? (
        <img
          src={
            typeof blogData.image === "string"
              ? blogData.image
              : URL.createObjectURL(blogData.image)
          }
          className="aspect-video object-cover"
          alt=""
        />
      ) : (
        <div className="bg-black aspect-video flex justify-center items-center">
          Select Image
        </div>
      )}
    </label>

    <input
      className="hidden"
      id="image"
      type="file"
      accept=".png,.jpg,.jpeg"
      onChange={(e) =>
        setBlogData({ ...blogData, image: e.target.files[0] })
      }
    />

    <br />

    <button onClick={id ? handleUpdateBlog : handlePostBlog}>
      {id ? "Update Blog" : "Post Blog"}
    </button>
  </div>
);

    
}

export default AddBlog