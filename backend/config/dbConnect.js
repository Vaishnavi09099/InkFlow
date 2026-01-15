const mongoose = require('mongoose')

async function dbConnect(){
    try{
            await mongoose.connect("mongodb+srv://vaishnavi09099_db_user:m28xW0KtgTZYdOLm@cluster0.qqwp4ji.mongodb.net/BlogDatabase");
        console.log("Db connected successfully");

    }
    catch(err){
        console.log("Error agaya while connecting db");
        console.log(err);
    }
}

module.exports = dbConnect