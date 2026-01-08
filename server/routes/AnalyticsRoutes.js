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

//total expenses
router.get("/api/analytics/totalExpense", isLoggedIn, wrapAsync(async (req, res) => {
  const [total] = await ExpenseModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(req.user.id)
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" }
      }
    }
  ]);

  res.json({
    success: true,
    data: {
      total: total?.totalAmount || 0
    }
  });
}));


//total expense this month
router.get("/api/analytics/Expense-month",isLoggedIn,wrapAsync(async(req,res)=>{
    const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const [total] = await ExpenseModel.aggregate([
    {
      $match: {
        userId:new mongoose.Types.ObjectId(req.user.id),
        date: { $gte: startOfMonth, $lt: startOfNextMonth }
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" }
      }
    }
  ]);

  res.json({
    success: true,
    data: {
      totalThisMonth: total?.totalAmount || 0
    }
  });
}));

//total expense previous month
router.get("/api/analytics/Expense-month-prev",isLoggedIn,wrapAsync(async(req,res)=>{
    const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth()-1, 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total] = await ExpenseModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(req.user.id),
        date: { $gte: startOfMonth, $lt: startOfNextMonth }
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" }
      }
    }
  ]);

  res.json({
    success: true,
    data: {
      totalPrevMonth: total?.totalAmount || 0
    }
  });
}));

//total expense current year
router.get("/api/analytics/Expense-year",isLoggedIn,wrapAsync(async(req,res)=>{
    const now=new Date();

    const yearStart=new Date(now.getFullYear(),0,1);
    const yearEnd=new Date(now.getFullYear()+1,0,1);

    const [total]=await ExpenseModel.aggregate([
        {
            $match:{
                userId:new mongoose.Types.ObjectId(req.user.id),
                date:{$gte:yearStart,$lte:yearEnd}
            }
        },
        {
            $group:{
                _id:null,
                totalAmount:{$sum:"$amount"}
            }
        }
    ]);

    res.json({success:true,data:{
        totalThisYear:total?total:0
    }})
}));

//total expense previous year
router.get("/api/analytics/Expense-year-prev",isLoggedIn,wrapAsync(async(req,res)=>{
    const now=new Date();

    const yearStart=new Date(now.getFullYear()-1,0,1);
    const yearEnd=new Date(now.getFullYear(),0,1);

    const [total]=await ExpenseModel.aggregate([
        {
            $match:{
                userId:new mongoose.Types.ObjectId(req.user.id),
                date:{$gte:yearStart,$lte:yearEnd}
            }
        },
        {
            $group:{
                _id:null,
                totalAmount:{$sum:"$amount"}
            }
        }
    ]);

    res.json({success:true,data:{
        totalPrevYear:total?total:0
    }})
}));

//highest expense this year
router.get("/api/analytics/highest-expense-year",isLoggedIn,wrapAsync(async(req,res)=>{
    const now=new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);

  const highestExpense = await ExpenseModel.findOne({
    userId: req.user.id,
    date: {
      $gte: startOfYear,
      $lt: startOfNextYear
    }
  }).sort({ amount: -1 });

  res.json({success:true,data:highestExpense || null})
}))

//highest category spent on this year
router.get(
  "/api/analytics/highest-category-year",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const now = new Date();

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);

    const highestCategory = await ExpenseModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.id),
          date: {
            $gte: startOfYear,
            $lt: startOfNextYear
          }
        }
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $sort: { totalAmount: -1 }
      },
      {
        $limit: 1
      }
    ]);

    res.json({
      success: true,
      data: {
        category: highestCategory[0]?._id || "N/A",
        amount: highestCategory[0]?.totalAmount || 0
      }
    });
  })
);

//highest paymentMode used this year
router.get(
  "/api/analytics/highest-paymentMode-year",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const now = new Date();

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);

    const highestCategory = await ExpenseModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.id),
          date: {
            $gte: startOfYear,
            $lt: startOfNextYear
          }
        }
      },
      {
        $group: {
          _id: "$paymentMode",
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $sort: { totalAmount: -1 }
      },
      {
        $limit: 1
      }
    ]);

    res.json({
      success: true,
      data: {
        paymentMode: highestCategory[0]?._id || "N/A",
        amount: highestCategory[0]?.totalAmount || 0
      }
    });
  })
);

//no of transactions this year
router.get("/api/analytics/transactions-year",isLoggedIn,wrapAsync(async(req,res)=>{
    const now = new Date();

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);

    const result = await ExpenseModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.id),
          date: { $gte: startOfYear, $lt: startOfNextYear }
        }
      },
      {
        $count: "totalTransactions"
      }
    ]);

    res.json({
      success: true,
      data: {
        totalTransactions: result[0] ? result[0].totalTransactions : 0
      }
    });
}))

//no of transactions this month
router.get("/api/analytics/transactions-month",isLoggedIn,wrapAsync(async(req,res)=>{
    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const result = await ExpenseModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.id),
          date: { $gte: startOfMonth, $lt: startOfNextMonth }
        }
      },
      {
        $count: "totalTransactions"
      }
    ]);

    res.json({
      success: true,
      data: {
        totalTransactions: result[0] ? result[0].totalTransactions : 0
      }
    });
}))

module.exports=router;
