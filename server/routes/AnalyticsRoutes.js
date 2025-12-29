const express = require("express");
const mongoose=require("mongoose");
const ExpenseModel = require('../models/Expense');
//const Expense = require('../models/Expense');
const validateExpense = require('../validators/expenseMiddleware');
const AppError = require('../utilities/AppError');
const wrapAsync = require('../utilities/WrapAsync');
const { isLoggedIn, isAuthorized } = require('../validators/userMiddleware');

const router = express.Router();

//Mongoose automatically casts userId to ObjectId in normal queries (find, findOne, findById),
//  but it does NOT do this inside aggregate() pipelines.


//sum and average by category
router.get("/api/analytics/category", isLoggedIn, wrapAsync(async (req, res) => {

    const { from, to } = req.query;

    const matchStage = {
        userId: new mongoose.Types.ObjectId(req.user.id) // IMPORTANT: user-based data
    };

    if (from || to) {
        matchStage.date = {};
        if (from) matchStage.date.$gte = new Date(from);
        if (to) matchStage.date.$lte = new Date(to);
    }

    const result = await ExpenseModel.aggregate([
        {
            $match: matchStage
        },
        {
            $group: {
                _id: "$category",
                total: { $sum: "$amount" },
                average:{
                    $avg:"$amount"
                }
            }
        },
        {
            $project: {
                category: "$_id",
                total: 1,
                average:1,
                _id: 0
            }
        }
    ]);

    res.json({
        success: true,
        data: result
    });
})
);


//sum and average by paymentMode
router.get("/api/analytics/paymentMode",isLoggedIn,wrapAsync(async (req,res)=>{
    const {from,to}=req.query;

    let matchStage={
        userId:new mongoose.Types.ObjectId(req.user.id)
    };

    if (from || to) {
        matchStage.date = {};
        if (from) matchStage.date.$gte = new Date(from);
        if (to) matchStage.date.$lte = new Date(to);
    }

    const result=await ExpenseModel.aggregate([
        {
            $match:matchStage
        },{
            $group:{
                _id:"$paymentMode",
                total:{
                    $sum:"$amount"
                },
                average:{
                    $avg:"$amount"
                }
            }
        },{
            $project:{
                paymentMode:"$_id",
                total:1,
                average:1,
                _id:0
            }
        }
    ]);

    res.json({success:true,data:result});
}))

router.get("/api/analytics/month",isLoggedIn,wrapAsync(async (req,res)=>{

    const result=await ExpenseModel.aggregate([
        {
            $match:{
                userId:new  mongoose.Types.ObjectId(req.user.id) 
            }
        },
        {
            $group:{
                _id:{
                    $month:"$date"
                },
                total:{
                    $sum:"$amount"
                },
                average:{
                    $avg:"$amount"
                }
            }
        },

        {
            $project:{
                month:"$_id",
                total:1,
                average:1,
                _id:0
            }
        }, {
            $sort: { month: 1 }
        }
    ]);

    res.json({success:true,data:result});
}))

module.exports=router;
