const express = require("express")
const verifyUser = require("../middlewares/auth")

const {
      createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    likeBlog,
    removeBlog

} = require("../controllers/blogController")
const route = express.Router();


route.post("/blogs",verifyUser,createBlog)


route.get("/blogs",getBlogs)

route.get("/blogs/:id",verifyUser,getBlogById)

route.patch("/blogs/:id",verifyUser,updateBlog)

route.delete("/blogs/:id",verifyUser,removeBlog)

route.post("/blogs/like/:id",verifyUser,likeBlog)

module.exports = route;