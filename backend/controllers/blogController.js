const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const {verifyJWT, decodeJWT} = require("../utils/generateToken")

//safe controllers
async function createBlog(req,res){
    try{
       console.log("Create blog controller");
       
       const creator = req.user;
    
        const {title,description,draft}=req.body;
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

        await User.findByIdAndUpdate(creator,{$push: {blogs:blog._id}});

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
        const {title,description,draft} = req.body;

        const user = await User.findById(creator).select("-password")

        const blog = await Blog.findById(id)
        if(!(creator === blog.creator)){
            return res.status(500).json({
                message: "You are not authorized for this action"
            });
        }

        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.draft = draft || blog.draft;

        await blog.save();

        return res.status(200).json({
            success:true,
            message:"Blog updated successfully",
            blog,
        })

     }catch(err){
        return res.status(500).json({
            message:err.message
        })

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