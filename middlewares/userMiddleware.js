const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {constants} = require('../utils/constants');

/**
 * creating middleware so that only signed up users can get the results
 * 
 */
exports.verifyJWTtoken = (req,res,next)=>{

try{
const token = req.headers["access-token"];
if(!token){
    return res.status(500).send("please provide valid access token");
};

jwt.verify(token,process.env.secret,(err,decoded)=>{
if(err){
    return res.status(500).send("unauthorized token");
};
req.email = decoded.id;

next();
});
}
catch{
    console.log("error in findAllValidations");
    res.status(500).send("error in findAllValidations");
}
}

/**
 * validations for admin users so that
 * only admin user can perform certain operations
 */
exports.adminValidations = async (req,res,next)=>{
try{
    const user = await User.findOne({email : req.email});
  
    if(user && user.userType === constants.admin){
      next();

    }
    else{
        return res.status(400).send("only admin user can do this call");
    }
}
catch{
    console.log("error in admin validations");
    return res.status(500).send("error in admin validations");
}
}


