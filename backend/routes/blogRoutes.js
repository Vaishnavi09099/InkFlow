const express = require("express")
const verifyUser = require("../middlewares/auth")

const {
      createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    removeBlog

} = require("../controllers/blogController")
const route = express.Router();


route.post("/blogs",verifyUser,createBlog)


route.get("/blogs",getBlogs)

route.get("/blogs/:id",getBlogById)

route.patch("/blogs/:id",verifyUser,updateBlog)

route.delete("/blogs/:id",removeBlog)

module.exports = route;