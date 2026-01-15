const mongoose = require("mongoose");

//draft--public(false)......private(true)

const blogSchema = new mongoose.Schema({
    title : {
        type:String,
        trim:true,
        required:true,
    },

    description : {
        type:String,
        required:true,
    },

    draft : {
        type:Boolean,
        default:false
        
    },
},
{timestamps:true}
)

const Blog = mongoose.model("Blog",blogSchema)
module.exports = Blog;