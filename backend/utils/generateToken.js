const jwt = require("jsonwebtoken")

async function generateJWT(payload){
   let token = await jwt.sign(payload,"jwtkabhautjadakhatarnak",{expiresIn : "1h"})
   return token

}
async function verifyJWT(token){
 
   try{
  let data = await jwt.verify(token,"jwtkabhautjadakhatarnak")
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

