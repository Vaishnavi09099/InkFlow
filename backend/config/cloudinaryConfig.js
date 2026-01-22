const cloudinary = require("cloudinary").v2;

async function cloudinaryConfig(){
    try{
        await cloudinary.config({
        cloud_name : "dgti8h4pp",
        api_key : "866518167336237",
        api_secret : "Gic9jI2Miz60W5l4YYglvNalJPc",


    });
    console.log("cloudinary configuration successfull ")

    }catch(err){
        console.log("error agaya hai while config cloudinary");
        console.log(err);

    }
    
}

module.exports = cloudinaryConfig;