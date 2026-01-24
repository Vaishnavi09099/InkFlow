const User = require("../models/userSchema")
const bcrypt = require("bcrypt")
const {generateJWT} = require("../utils/generateToken")


async function createUser(req,res){
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

        const checkForExistingUser = await User.findOne({email})
        if(checkForExistingUser){
            return res.status(400).json({
                success:false,
                message:"User already registered with this email"
            })
        }
        let salt = await bcrypt.genSalt(5)

        const hashedPass = await bcrypt.hash(password,salt)
    
        const newUser = await User.create({
            name,
            email,
            password : hashedPass,
        })

        let token = await generateJWT({
            email : newUser.email,
            id: newUser._id,
        })



        return res.status(200).json({
            success:true,
            message:"user created successfully",
            user: {
                name :newUser.name,
                email:newUser.email,
           
               
                
            },

            token
          
        });

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Please try again",
            error:err.message
        })

    }
}

async function loginUser(req,res){
    const{password,email }=req.body;
    console.log(req.body)

    try{
        
        
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
        if(!checkForExistingUser){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }
       
        


        let checkForPass = await bcrypt.compare(
            password,
            checkForExistingUser.password,
           
        
        )
if(!checkForPass){
            return res.status(400).json({
                success:false,
                message:"Wrong password"
            })
        }

           let token = await generateJWT({
            email : checkForExistingUser.email,
            id: checkForExistingUser._id,
        })

        return res.status(200).json({
            success:true,
            message:"User LogedIn successfully",
            user:{
                name: checkForExistingUser.name,
                email:checkForExistingUser.email,
            
            },
            token
          
        });

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Please try again",
            error:err.message
        })

    }
}



async function getUsers(req,res){
       try{
            const users = await User.find({}) //sare users dedo
        //db call
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
    
}
async function getUsersById(req,res){
    try{

        const id = req.params.id;
        const user = await User.findById(id)
      
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

}
async function updateUser(req,res){
       try{  
        const {id} = req.params
           const {name,email,password} = req.body
        const updatedUser = await User.findByIdAndUpdate(id,{name,email,password},{new:true})
      
       
       
        if(!updatedUser){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        return res.status(200).json({
            message:"user updated successfully",
       
    })

    }
    catch(err){
        return res.status(500).json({message : "user not found"})

    }

}
async function removeUser(req,res){
      
     try{  
        const {id} = req.params
           const {name,email,password} = req.body
        const deletedUser = await User.findByIdAndDelete(id)
      
       
       
        if(!deletedUser){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        return res.status(200).json({
            message:"user deleted successfully",
            deletedUser
       
    })

    }
    catch(err){
        return res.status(500).json({message : "user not found"})

    }

}

module.exports = {
    createUser,
    loginUser,
    getUsers,
    getUsersById,
    updateUser,
    removeUser
}