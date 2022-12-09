const mongoose = require('mongoose');
const {constants} = require('../utils/constants');

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        minLength:8,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    createdAt:{
        type:Date,
        immutable:true,
        default:()=>{
            return Date.now()
        }
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now()
        }
    },
    userType:{
        type:String,
        required:true,
        default : constants.customer
    },
    userStatus:{
        type:String,
        required:true,
        default : constants.approved

    }
});

module.exports = mongoose.model("user",userSchema)