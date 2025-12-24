const express = require('express');
const ExpenseModel = require('../models/Expense');
const Expense = require('../models/Expense');
const validateExpense=require('../validators/expenseMiddleware');
const AppError=require('../utilities/AppError');
const wrapAsync=require('../utilities/WrapAsync');
const router = express.Router();

const APIBASE = `http://localhost:3000`;

//test
router.get(`/home`, (req, res) => {
    res.json({ data: "home" });
})

//to put data
router.post('/api/expenses',validateExpense,wrapAsync(async (req, res) => {
    //res.send(req.body)
    const expense = new ExpenseModel(req.body);
    await expense.save();
    console.log(expense);
    res.json({success:true,data:{expenses:expense,message:"successfully addded an expense"}})
    return;
}))


router.get('/api/expenses', wrapAsync(async (req, res) => {
    const expenses = await ExpenseModel.find().sort({ date: -1 });
    res.json({success:true,data:{expenses:expenses,message:"successfully retrieved expenses"}});
    return;
}))

router.put('/api/expenses/:id',validateExpense, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedData = await ExpenseModel.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.json({success:true,data:{expenses:updatedData,message:"successfully updated an expense"}});
}))


router.delete('/api/expenses/:id',wrapAsync(async (req, res) => {
    const { id } = req.params;
    await ExpenseModel.findByIdAndDelete(id);
    res.json({success:true,data:{message:"successfully deleted an expense"}})
}))

//filter route

router.get("/api/expenses/filter", wrapAsync(async (req, res, next) => {
    
        const { category, paymentMode, from, to } = req.query;

        const query = {};

        if (category) {
            query.category = category;
        }

        if (paymentMode) {
            query.paymentMode = paymentMode;
        }

        if (from || to) {
            query.date = {};

            if (from) {
                query.date.$gte = new Date(from);
            }

            if (to) {
                query.date.$lte = new Date(to);
            }
        }

        const expenses = await ExpenseModel.find(query).sort({ date: -1 });

        res.json({success:true,data:{expenses:expenses,message:"successfully filtered expenses"}});
    
}));


module.exports = router;