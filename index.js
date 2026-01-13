const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const blogs = []

app.use(express.json());
app.use(cors())

//m28xW0KtgTZYdOLm
//mongodb+srv://vaishnavi09099_db_user:<db_password>@cluster0.qqwp4ji.mongodb.net/?appName=Cluster0

async function dbConnect(){
    try{
        await mongoose.connect("mongodb+srv://vaishnavi09099_db_user:m28xW0KtgTZYdOLm@cluster0.qqwp4ji.mongodb.net/BlogDatabase");
        console.log("Db connected successfully");
    }catch(error){
        console.log("Error agaya while connecting db");
        console.log(error);
    }
}

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type:String,
        unique:true
    },
    password : String
})

const User = mongoose.model("User",userSchema);

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






app.post("/users",async (req,res)=>{
    const{name,password,email }=req.body;
    console.log(req.body)

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

        const checkForExistingUser = await User.findOne({email})
        if(checkForExistingUser){
            return res.status(400).json({
                success:false,
                message:"User already registered with this email"
            })
        }
        const newUser = await User.create({
            name,
            email,
            password,
        });

        return res.status(200).json({
            success:true,
            message:"user created successfully",
            newUser
        });

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Please try again",
            error:err.message
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
dbConnect();


app.listen(3000,()=>{
    console.log("server started");
})
