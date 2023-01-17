const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

// it will be used every time front end client will want data from data base or server . 
const Authenticate = async(req , res , next)=>{
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json("Unauthorized user");

  try{
    const verifyToken = jwt.verify(token , process.env.SECRET_KEY )  ; 

    const user = await User.findOne({ _id:verifyToken._id}) ; 

    if(!user){
       req.user = undefined ; 
       next() ; 
    }else {
      req.user = user ; 
       next() ; 
    }
   
  }catch(error){
   res.status(400).json("Unauthorized : Token not valid")
   console.log(error) ; 
  }
}

module.exports = Authenticate ; 

