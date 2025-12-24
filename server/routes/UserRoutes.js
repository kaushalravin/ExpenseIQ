const bcrypt = require('bcrypt');
const express = require('express');
const userModel = require('../models/User.js');
const wrapAsync=require('../utilities/WrapAsync.js');
const AppError=require('../utilities/AppError.js');
const validateUser=require('../validators/userMiddleware.js');
const router = express.Router();

//signup route
router.post('/api/signup',validateUser, wrapAsync(async (req, res) => {
    const { username, password, email } = req.body;

    const isExisting=await userModel.findOne({$or:[{username},{email}]});//or requires an array of conditions
    if(isExisting){//using findOne as find gives an array
        console.log(isExisting);
        throw new AppError("User already exists",409);
    }

    const toStore={};
    toStore.username=username;
    toStore.email=email;
    toStore.password= await bcrypt.hash(password, 12);

    const user=new userModel(toStore);
    await user.save();
    console.log(user);
    res.status(201).json({
        success:true,
        message:"User saved successfully"
    })
}))


//login route

module.exports=router;