
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require("jsonwebtoken");
const userModel = require('../models/User.js');
const wrapAsync = require('../utilities/WrapAsync.js');
const AppError = require('../utilities/AppError.js');
const { validateUser, validateUserLogin,isLoggedIn } = require('../validators/userMiddleware.js');

const router = express.Router();

//signup route
router.post('/api/signup', validateUser, wrapAsync(async (req, res) => {
    const { username, password, email } = req.body;

    const isExisting = await userModel.findOne({ $or: [{ username }, { email }] });//or requires an array of conditions
    if (isExisting) {//using findOne as find gives an array
        console.log(isExisting);
        throw new AppError("User already exists", 409);
    }

    const toStore = {};
    toStore.username = username;
    toStore.email = email;
    toStore.password = await bcrypt.hash(password, 12);

    const user = new userModel(toStore);
    await user.save();
    console.log(user);
    res.status(201).json({
        success: true,
        message: "User saved successfully"
    })
}))


//login route
router.post('/api/login', validateUserLogin, wrapAsync(async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
        throw new AppError("username or password doesnot exist", 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new AppError("Wrong username or password", 401);
    }

    //creating a jwt signed token
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    //sending the token using cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false // true in production
    });

    res.json({
      success: true,
      data: {
        message: "Login successful"
      }
    });
}
))


//logout route
router.post("/api/logout",isLoggedIn, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: false // true in production
  });

  res.json({
    success: true,
    data: {
      message: "Logged out successfully"
    }
  });
});


module.exports = router;