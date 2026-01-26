const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const {uploadImage} = require("../utils/uploadImage")
const fs = require("fs")
const uniqid = require("uniqid")
const { randomUUID } = require("crypto");



const {verifyJWT, decodeJWT} = require("../utils/generateToken")

//safe controllers
async function createBlog(req,res){
    try{
     
       
       const creator = req.user;
    
        const {title,description,draft}=req.body;
        const image = req.file;
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

        //cloudinary wali prakriya start kro
        const {secure_url,public_id} = await uploadImage(image.path)
        fs.unlinkSync(image.path)

        const blogId = title.toLowerCase().split(" ").join("-")+"-"+randomUUID();



        const blog = await Blog.create({description,title,draft,blogId,creator,image:secure_url,imageId:public_id});

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
        const blogs = await Blog.find({ draft:false}).populate({
            path : "creator",
            select:"-password",

        }).populate({
            path:"likes",
            select:"email name"

        }).populate({
            path:"comments",
              populate:{
                path:"user",
                select:"name email"
              }
            
        })
        
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
async function getBlogById(req, res) {
  try {
    const {blogId} =req.params;
    const blog =await Blog.findOne({ blogId}).populate({
      path:"comments",
      populate:{
        path:"user",
        select:"name email",
      }
    }).populate({
      path:"creator",
      select:"name email"
    
    })
    return res.status(200).json({
      message:"Blog fetched successfully",
      blog
    })

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
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
    const creator =req.user;
    const { id } = req.params;

  const blog = await Blog.findById(id)

  if(!blog){
    return res.status(500).json({
        message: "Blog is not found"
    })
  }
        if((creator != blog.creator)){
            return res.status(500).json({
                message: "You are not authorized for this action"
            });
        }

        await deleteImagefromCloudinary(blog.imageId);
        await Blog.findByIdAndDelete(id);
    await User.findByIdAndUpdate(creator,{$pull : {blogs: id}})

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

async function commentBlog(req, res) {
  try {
  
    //kon kararaha hai 
    // kispr krre ho
    // kya krre ho;
      const creator =req.user
    const { id } = req.params;
    const {comment} = req.body;

    if(!comment){
      return res.status(500).json({
        message:"Please enter the comment",
      })
    }

  const blog = await Blog.findById(id)

  if(!blog){
    return res.status(500).json({
        message: "Blog is not found"
    })
  }
  //create the comment
  const newComment = await Comment.create({
    comment,
    blog:id,
    user:creator});


  await Blog.findByIdAndUpdate(id,{
    $push:{comments:newComment._id}
  })

  return res.status(200).json({
    success:true,
    message:"Comment added successfully"
  })

       


  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
async function likeBlog(req, res) {
  try {
    const creator =req.user;
    const { id } = req.params;

  const blog = await Blog.findById(id)

  if(!blog){
    return res.status(500).json({
        message: "Blog is not found"
    })
  }

//like-->dislike

  if(!blog.likes.includes(creator)){

    await Blog.findByIdAndUpdate(id,{ $push:{likes: creator}})

    return res.status(200).json({
        success:true,
        message:"Blog liked successfully",
    })
  }else{
     await Blog.findByIdAndUpdate(id,{ $pull:{likes: creator}})
    return res.status(200).json({
        success:true,
        message:"Blog disliked successfully"
    })
  }
       


  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function deleteComment(req,res){
  try{
    const userId = req.user._id;
    const {id} = req.params;

    const comment = await Comment.findById(id);

    if(!comment){
      return res.status(500).json({
        message:"Comment not found",
      })
    }

    if(comment.user !=userId && comment.blog.creator != userId){
      return res.status(500).json({
        message:"You are not authorized",
      })
    }

    await Blog.findByIdAndUpdate(comment.blog._id,{
      $pull :{ comments:id},
    });

    await Comment.findByIdAndDelete(id);
    
     return res.status(200).json({
      message: "Comment deleted successfully",
    });

  }
  catch(err){
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
    likeBlog,
    removeBlog,
    
}