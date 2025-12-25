require("dotenv").config();
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const cookieParser = require("cookie-parser");



//route handlers
const ExpenseRouteHandlers=require('./routes/ExpenseRoutes');
const UserRouteHandlers=require('./routes/UserRoutes');

//errorhandlers
const AppError = require('./utilities/AppError');


const app=express();




mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connection successful!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(ExpenseRouteHandlers);
app.use(UserRouteHandlers);


//CRUD OPERATIONS FOR EXPENSE MODEL

app.all('*wildcard',(req,res,next)=>{
  throw new AppError('page not found',404);
})


app.use((err,req,res,next)=>{
 const {statusCode=500}=err;
 if(!err.message){
  err.message='something went wrong';
 }
 res.json({success:false,error: {
    message: err.message,
    statusCode:statusCode
  }})
 
})

app.listen(process.env.PORT,()=>{
    console.log("server is running in localhost 3000");
})