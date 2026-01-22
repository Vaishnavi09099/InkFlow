const cloudinary = require("cloudinary").v2
const cloudinaryConfig = require("../config/cloudinaryConfig")

async function uploadImage(imagePath){
    try{
 cloudinary.config({
        cloud_name : "dgti8h4pp",
        api_key : "866518167336237",
        api_secret : "Gic9jI2Miz60W5l4YYglvNalJPc",


    });
    const result = await cloudinary.uploader.upload(imagePath,{
        folder:"blog app",
       
    })

    return result;
    }
    catch(err){
         console.log(err);

    }
   
   

}
async function deleteImagefromCloudinary(imageId){
    try{
        const result = await cloudinary.uploader.destroy(imageId);
       
    }

    
    catch(err){
console.log(err);
    }
}
module.exports = {uploadImage,deleteImagefromCloudinary}