const express = require("express");
const app = express();
const blogs = []

app.use(express.json());

app.post("/blogs",(req,res)=>{
    try{
        blogs.push({...req.body,id:blogs.length+1});
        return res.json({message:"blog created successfully"});

    }
    catch(err){
        return res.status(500).json({message:"blog creation error"});

    }
})


app.get("/blogs",(req,res)=>{
    try{
        let publicBlogs = blogs.filter(blog => !blog.draft)
        return res.json({publicBlogs})

    }
    catch(err){
        return res.json({message: "Cannot fetch blogs"})

    }
})

app.get("/blogs/:id",(req,res)=>{
    try{
        const {id} = req.params;
        let searchBlog = blogs.filter(blog => blog.id == id)
        return res.json({searchBlog})
    }
    catch(err){
        return res.json({message: "error fetching info"})
    }
})

app.patch("/blogs/:id",(req,res)=>{
    try{
        const {id} = req.params
        let index = blogs.findIndex(blog => blog.id == id)
        blogs[index]={...blogs[index],...req.body}
        return res.json({message:"updated successfully"})

    }
    catch(err){
        return res.status(500).json({message : "Blog updated successfully"})

    }
})

app.delete("/blogs/:id",(req,res)=>{
    try{
        const {id} = req.params
        let updatedAfter = blogs.filter(blog => blog.id != id)
        return res.json({updatedAfter})

    }
    catch(err){
        return res.status(500).json({message : "error in deletion"})

    }
})


app.listen(3000,()=>{
    console.log("server started");
})

