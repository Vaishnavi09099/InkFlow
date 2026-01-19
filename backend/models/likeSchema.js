const mongoose = require("mongoose");

//kya main like kr raha hu
//kon like kar raha hai
const likeSchema = new mongoose.Schema({
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Blog",
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
  
},
{timestamps:true}
)

const like = mongoose.model("like",likeSchema)
module.exports = like;