const mongoose = require('mongoose')
const dotenv = require("dotenv")


dotenv.config();
async function dbConnect(){
    try{
            await mongoose.connect(process.env.DB_URL);
        console.log("Db connected successfully");

    }
    catch(err){
        console.log("Error agaya while connecting db");
        console.log(err);
    }
}

module.exports = dbConnect