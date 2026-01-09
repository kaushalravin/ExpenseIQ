const express = require('express');
const ExpenseModel = require('../models/Expense');
//const Expense = require('../models/Expense');
const validateExpense = require('../validators/expenseMiddleware');
const AppError = require('../utilities/AppError');
const wrapAsync = require('../utilities/WrapAsync');
const { isLoggedIn, isAuthorized } = require('../validators/userMiddleware');
const router = express.Router();

const APIBASE = `http://localhost:3000`;

//test
router.get(`/home`, (req, res) => {
    res.json({ data: "home" });
})

//to put data
router.post('/api/expenses', isLoggedIn, validateExpense, wrapAsync(async (req, res) => {
    //res.send(req.body)
    const expense = new ExpenseModel(req.body);
    expense.userId = req.user.id;
    await expense.save();
    console.log(expense);
    res.json({ success: true, data: { expenses: expense, message: "successfully addded an expense" } })
    return;
}))


router.get('/api/expenses', isLoggedIn, wrapAsync(async (req, res) => {
    const expenses = await ExpenseModel.find({ userId: req.user.id }).sort({ date: -1 });
    res.json({ success: true, data: { expenses: expenses, message: "successfully retrieved expenses" } });
    return;
}))

router.put('/api/expenses/:id', isLoggedIn, isAuthorized, validateExpense, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedData = await ExpenseModel.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    if (!updatedData) {
        throw new AppError("Expense not found", 404);
    }
    res.json({ success: true, data: { expenses: updatedData, message: "successfully updated an expense" } });
}))


router.delete('/api/expenses/:id', isLoggedIn, isAuthorized, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await ExpenseModel.findByIdAndDelete(id);
    res.json({ success: true, data: { message: "successfully deleted an expense" } })
}))

//post route to insert many entries at once (after parsing csv)
router.post('/api/expenses/bulk',isLoggedIn,wrapAsync(async(req,res,next)=>{
    const expensesArray = req.body.expenses;
    if (!Array.isArray(expensesArray) || expensesArray.length === 0) {
        throw new AppError("No expenses provided", 400);
    }
    console.log(expensesArray);

    const docs = expensesArray.map((expenseData) => ({
        ...expenseData,
        userId: req.user.id
    }));

    const inserted = await ExpenseModel.insertMany(docs, {
        ordered: true,
        runValidators: true
    });

    res.json({
        success: true,
        data: {
            message: "successfully added multiple expenses",
            count: inserted.length
        }
    });
}))

//filter route

router.get("/api/expenses/filter", isLoggedIn, wrapAsync(async (req, res, next) => {

    const { category, paymentMode, from, to, minAmount, maxAmount, note } = req.query;
    console.log(minAmount+"\t"+maxAmount+"\t"+note)
    const query = {};
    query.userId = req.user.id;

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

    if (minAmount || maxAmount) {

        query.amount = {};
        if (minAmount) {
            query.amount.$gte = Number(minAmount);
        } if (maxAmount) {
            query.amount.$lte = Number(maxAmount);
        }
    }

    if (note) {//case insensitive
        query.note = { $regex: note, $options: "i" };
    }

    const expenses = await ExpenseModel.find(query).sort({ date: -1 });

    res.json({ success: true, data: { expenses: expenses, message: "successfully filtered expenses" } });

}));


module.exports = router;