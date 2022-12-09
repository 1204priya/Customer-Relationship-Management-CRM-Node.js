const User = require('../models/userModel')
const {constants} = require('../utils/constants')

/**
 * checking if user has provided required values such as 
 * userId , name , email, password, userType and if not showing 
 * respective error to the user
 */

exports.signUpValidations = async(req,res,next)=>{

try{
     // checking if user is providing userId or not

    if(!req.body.userId){
        return res.status(500).send("please provide userId")
    };

    const user = await User.findOne({userId : req.body.userId});

    if(user !== null){
      return res.status(500).send("userId is already taken! please provide another one")
    };

    if(!req.body.password){
        return res.status(500).send("please provide password")
    };


    if(!req.body.name){
        return res.status(500).send("name can't be empty");
    };
    
    
    if(!req.body.email){
        return res.status.send("email can't be empty");
    };

    if(!isvalidEmail(req.body.email)){
        return res.status(500).send("email is not valid");
    };

    const emailTaken = await User.findOne({email:req.body.email});

    if(emailTaken !== null){
     return res.status(400).send("email is already taken");
    };


    if(req.body.userType == constants.admin){
        return res.status(500).send("usertype cant be admin");
    };
    
    const users = [constants.engineer,constants.customer];

     if(!users.includes(req.body.userType)){
      return res.status.send("user can only apply for CUSTOMER or ENGINEER");
     };

    next()
    }
    catch{
        console.log("error in signup validations");
        res.status(500).send("error in signup validations");
    };
}

/**
 * function to check if email is in valid format
 */
const isvalidEmail = (email)=>{
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
};

/**
 * validations for signin
 */
exports.signInValidations = async (req,res,next)=>{

try{

    if(!req.body.email){
    return  res.status(500).send("please provide email");
    };

    if(!req.body.password){
        return res.status(500).send("please provide password");
    };

    next();
}
catch{
    console.log("error in signup validations");
    res.status(500).send("error in signup validations");
};
}


