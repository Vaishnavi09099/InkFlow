const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");

async function createBlog(req,res){
    try{
        const {title,description,draft,creator}=req.body;
        if(!title){
            return res.status(400).json({
                message:"Please fill title",
            })
        }
        if(!description){
            return res.status(400).json({
                message:"Please fill description",
            })
        }

        const findUser = await User.findById(creator)

        if(!findUser){
            return res.status(500).json({
                message:"Kon hai bhau tiii"
            })
        }

        const blog = await Blog.create({description,title,draft,creator});

        await User.findByIdAndUpdate(creator,{$push: {blogs:blog}});

        return res.status(200).json({
            message:"Blog created successfully",
            blog
        })
    }
    catch(err){
        return res.status(500).json({
            message:err.message,
        })
    }


}
async function getBlogs(req,res){
    try{
        const blogs = await Blog.find({});
        return res.status(200).json({
            message:"Blog fetched successfully",
            blogs
        })
    }
    catch(err){
        return res.status(500).json({
            message:err.message,
        })

    }

}
async function getBlogById(req,res){
     try{
        const {id} = req.params
        const blog = await Blog.findById(id);
        return res.status(200).json({
            message:"Blog fetched successfullyy",
            blog
        }) 

    }
    catch(err){
           return res.status(500).json({
            message:err.message,
        })
        
    }

}
async function updateBlog(req,res){
     try{
        const {id} = req.params;
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        )

        if(!updatedBlog){
            return res.status(404).json({
                message: "Blog not found!"
            })
        }

         return res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog,
    });


    }
   catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function removeBlog(req, res) {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: "Blog deleted successfully",
      deletedBlog,
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}


module.exports ={
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    removeBlog
}