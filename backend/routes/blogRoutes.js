const express = require("express")

const {
      createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    removeBlog

} = require("../controllers/blogController")
const route = express.Router();


route.post("/blogs",createBlog)


route.get("/blogs",getBlogs)

route.get("/blogs/:id",getBlogById)

route.patch("/blogs/:id",updateBlog)

route.delete("/blogs/:id",removeBlog)

module.exports = route;