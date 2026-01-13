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





let users = [];
app.post("/users",(req,res)=>{
    const{name,password,email }=req.body;
    try{
        if(!name){
            return res.status(400).json({
                success:false,
                message:"Please fill the name",
            });
        }
        if(!password){
            return res.status(400).json({
                success:false,
                message:"Please fill the password"
            })
        }
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Please fill the email",
            })
        }
        users.push({...req.body,id:users.length+1});
        return res.status(200).json({
            success:true,
            message:"user created successfully",
        });

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Please try again",
        })

    }
})

app.get("/users",(req,res)=>{
    try{
        return res.status(200).json({
            success:true,
            message:"Users fetched successfully",
            users
        })

    }
    catch(err){
          return res.status(500).json({
            success:false,
            message:"Please try again",
        })

    }
})

app.get("/users/:id",(req,res)=>{
    try{
        const user = users.filter((user)=>user.id == req.params.id)
        if(!user){
             return res.status(404).json({
            success:false,
            message:"User not found",
            
        })
            
        }
        return res.json({
            success:true,
            message:"User fetched successfully",
            user,

        })
       

    }
    catch(err){
          return res.status(500).json({
            success:false,
            message:"Cannot find User",
        })

    }
})

app.put("/users/:id",(req,res)=>{
    
    
     try{
        const {id} = req.params
        const index = users.findIndex(user => user.id == id)
        if(index==-1){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        users[index]={...users[index],...req.body}
        return res.status(200).json({
            message:"user updated successfully",
        user:users[index],
    })

    }
    catch(err){
        return res.status(500).json({message : "user not found"})

    }
})

app.delete("/users/:id",(req,res)=>{
    try{

           const {id} = req.params
        const index = users.findIndex(user => user.id == id)
        if(index==-1){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        users = users.filter((user)=>user.id != req.params.id)
        
             return res.status(200).json({
            success:false,
            message:"User deleted successfully",
            users,
        })
       

    }
    catch(err){
          return res.status(500).json({
            success:false,
            message:"error deleting user",
        })

    }
})



app.listen(3000,()=>{
    console.log("server started");
})
