const express = require("express")
const verifyUser = require("../middlewares/auth")
const upload = require("../utils/multer")

const {
      createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    likeBlog,
    removeBlog,
   

} = require("../controllers/blogController")
const {
      commentBlog,
      deleteComment,
      editComment,
      likeComment
   

} = require("../controllers/commentController")
const route = express.Router();

//blogs
route.post("/blogs",verifyUser, upload.single("image") , createBlog)
route.get("/blogs",getBlogs)
route.get("/blogs/:id",verifyUser,getBlogById)
route.patch("/blogs/:id",verifyUser,updateBlog)
route.delete("/blogs/:id",verifyUser,removeBlog)

//likeblog
route.post("/blogs/like/:id",verifyUser,likeBlog)

//comment
route.post("/blogs/comment/:id",verifyUser,commentBlog)
route.delete("/blogs/comment/:id",verifyUser,deleteComment)
route.patch("/blogs/edit-comment/:id",verifyUser,editComment)
route.patch("/blogs/like-comment/:id",verifyUser,likeComment)


module.exports = route;