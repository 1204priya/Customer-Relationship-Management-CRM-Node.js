const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {constants} = require('../utils/constants');

exports.signup = async (req,res)=>{

    try{

        if(req.body.userType !== constants.customer){
            req.body.userStatus = constants.pending
        };

        const userObj = {
        userId : req.body.userId,
        name:req.body.name,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8),
        userType: req.body.userType,
        userStatus:req.body.userStatus
    };

    const userCreated = await User.create(userObj);

    const response = {
        userId:userCreated.userId,
        name:userCreated.name,
        email:userCreated.email,
        userType:userCreated.userType,
        createdAt:userCreated.createdAt,
        updatedAt:userCreated.updatedAt,
        userStatus:userCreated.userStatus

    };

    return res.status(500).send(response);
}
catch(err){
console.log("error in signup");
res.status(500).send("error in signup");
};
}

exports.signin = async (req,res)=>{
    try{

        const user = await User.findOne({email:req.body.email});

        if(user == null){
        return res.status(500).send("invalid user")
        };

    const validPass = bcrypt.compareSync(req.body.password,user.password);

    if(!validPass){
        return res.status(500).send("invalid password")
    };

    const token = jwt.sign(
        {id:user.email},
        process.env.secret,
        {expiresIn:600}
        );

        const response = {
            name : user.name,
            email:user.email,
            userType:user.userType,
            userStatus:user.userStatus,
            accessToken:token,
            createdAt:user.createdAt,
            updatedAt:user.updatedAt
        }

        return res.status(200).send(response);

    }
    catch(err){
        console.log("error in signin");
        return res.status(500).send("error in signin")
    };

}
