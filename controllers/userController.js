

const User = require('../models/userModel')

exports.findAll = async (req,res)=>{
    try{
        const user = await User.find();

        return res.status(200).send(user.map((users)=>{
          return {
                 id:users.id,
                 name : users.name,
                 email : users.email,
                 userType : users.userType,
                 userId : users.userId,
                 userStatus : users.userStatus,
                 createdAt : users.createdAt,
                 updatedAt : users.updatedAt
        }
        }))

    }
    catch{
        console.log("error in findAll");
        return res.status(500).send("error in findAll")
    };
}




