const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")


dotenv.config();
async function generateJWT(payload){
   let token = await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : "30d"})
   return token

}
async function verifyJWT(token){
 
   try{
  let data = await jwt.verify(token,process.env.JWT_SECRET)
   return data;
   }catch(err){
      return false

   }
 

}


async function decodeJWT(token){
   let decoded = await jwt.decode(token);
   console.log("decoded",decoded)
   return decoded;

}


module.exports = {generateJWT,verifyJWT,decodeJWT}

