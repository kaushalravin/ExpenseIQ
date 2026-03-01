require("dotenv").config();
// Helps avoid intermittent outbound HTTPS failures on networks with broken IPv6.
require("dns").setDefaultResultOrder("ipv4first");
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const cookieParser = require("cookie-parser");
const path = require("path");



//route handlers
const ExpenseRouteHandlers=require('./routes/ExpenseRoutes');
const UserRouteHandlers=require('./routes/UserRoutes');
const ExpenseAnalyticsHandlers=require('./routes/AnalyticsRoutes');

//errorhandlers
const AppError = require('./utilities/AppError');


const app=express();


const PORT=process.env.PORT||3000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connection successful!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use(ExpenseRouteHandlers);
app.use(UserRouteHandlers);
app.use(ExpenseAnalyticsHandlers);


//CRUD OPERATIONS FOR EXPENSE MODEL

app.all('*wildcard',(req,res,next)=>{
  throw new AppError('page not found',404);
})


app.use((err,req,res,next)=>{
 const {statusCode=500}=err;
 if(!err.message){
  err.message='something went wrong';
 }
 res.status(statusCode).json({success:false,error: {
    message: err.message,
    statusCode:statusCode
  }})
 
})




app.listen(PORT,()=>{
    console.log("server is running in localhost port "+PORT);
})

