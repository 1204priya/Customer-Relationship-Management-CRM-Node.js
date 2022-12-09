
const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./configs/serverConfig');
const User = require('./models/userModel');
const {constants} = require('./utils/constants');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json({urlEncoded:true}));
 
/**
 * removing mongoose deprecation warning
 */
mongoose.set('strictQuery', true); 
/**
 * mongodb connection
 */ 
mongoose.connect(process.env.mongoUrl);
const db = mongoose.connection;

db.on('error',()=>{
    console.log("error while connecting to mongodb");
});
db.once('open',()=>{
    console.log("successfully connected to mongodb");
    init()
});

/**
 * 
 * create admin user at boot time
 */
const init =async()=>{          
    /**
     * drop all the existing collection data
     */

    //await User.collection.drop();

    //check if admin already exist
    const user = await User.findOne({userId : "admin"})
     
    if(user){
    console.log("admin user is already present");
    return;
     }
    // if admin does not exist then creating new admin
    
    const adminObj =  await User.create({
        userId:"admin",
        name:"priya",
        email:"pr548011@gmail.com",
        password : bcrypt.hashSync(process.env.adminPass,8),
        userType : constants.admin
    })
    console.log(adminObj);

};

/**
 * importing routes
 */
require('./routes/authRoute')(app);
require('./routes/userRoutes')(app);

const start = async(err)=>{
    if(err){
        console.log("error while connecting to server");
        process.exit(1);
    }
    await app.listen(PORT)
    console.log("server has started on port no ",PORT);

};
start();

