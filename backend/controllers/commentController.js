const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const Comment = require("../models/commentSchema");

const {verifyJWT, decodeJWT} = require("../utils/generateToken")

//safe controllers


//yaha blog ki id dali thi ki konse blog me comment krna hai
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

//yaha comment ki id dali hai ki konsi comment delete krna hai
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

//yaha blog aur comment dono ki id hogi
async function editComment(req,res){
  try{
    //kon edit krra hai 
    const userId = req.user;
    console.log(userId)
    //konsi comment edit krra hai
    const {id} = req.params;
    console.log(id)
    //kya comment edit krre ho new 
    const {updatecomment} = req.body;
    console.log(updatecomment)

    //konsi id thi
    const comment = await Comment.findById(id);
    console.log(comment);

    if(!comment){
      return res.status(500).json({
        message:"Comment is not found",
      })
    }
    
      if(comment.user != userId){
      return res.status(400).json({
        success:false,
        message:"you are not valid user to edit this comment"
      })
    }

    await Comment.findByIdAndUpdate(id,{comment: updatecomment});
  
    return res.status(200).json({
      success:true,
      message:"Comment updated successfully"
    })

  }
  catch(err){
    return 
  }
}

//kis comment pr like hora hai and kon krra hai
//isme comment ki id pr jaegi request
async function likeComment(req,res){
  try{
  const userId = req.user;
  const{id}=req.params

  const comment = await Comment.findById(id);

if(!comment.likes.includes(userId)){
 
    await Comment.findByIdAndUpdate(id,{ $push:{likes: userId}})

    return res.status(200).json({
        success:true,
        message:"Comment liked successfully",
    })
  }else{
     await Comment.findByIdAndUpdate(id,{ $pull:{likes: userId}})
    return res.status(200).json({
        success:true,
        message:"Comment disliked successfully"
    })
  }}
  catch(err){
    return res.status(500).json({
      message:err.message
    })
  }


}

module.exports ={
    
    deleteComment,
    commentBlog,
    editComment,
    likeComment
}