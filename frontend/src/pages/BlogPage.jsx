import axios from 'axios';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';

function BlogPage() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"))
  const token = JSON.parse(localStorage.getItem("token"))

  async function fetchBlogById() {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      if (!token) {
        toast.error("Login first");
        return;
      }

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
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    fetchBlogById();
  }, [id]);

  return (
    <div>
      {blogData ? (
        <div className="min-w-[1000px]">
          <h1 className="mt-10 font-bold text-6xl">{blogData.title}</h1>
          <h2 className="my-5 text-3xl">{blogData.creator.name}</h2>

          <img
            src={blogData.image}
            alt="blog"
            className="max-w-[500px]"
          />
{user && user.email === blogData.creator.email && (
            <button className="bg-green-600 mt-5 mb-5 px-6 py-2 text-xl rounded text-white">
              <Link to={"/edit/" + blogData.blogId}>Edit</Link>
            </button>
          )}
        </div>
      ) : (
        <h1>Loading.......</h1>
      )}
    </div>
  );
}

export default BlogPage;
