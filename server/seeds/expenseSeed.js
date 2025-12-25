const Expense = require('../models/Expense');
const ExpenseModel=require('../models/Expense');
const mongoose=require('mongoose');

mongoose
  .connect("mongodb://localhost:27017/ExpenseIQ")
  .then(() => {
    console.log("MongoDB connection successful!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


const data=[
  {
    "userId":'694bd9870d772e090cc6c65f',
    "amount": 120,
    "category": "Food",
    "paymentMode": "UPI",
    "note": "Breakfast dosa",
    "date": "2024-06-18"
  },
  {
    "userId":'694bd9870d772e090cc6c65f',
    "amount": 450,
    "category": "Shopping",
    "paymentMode": "Debit Card",
    "note": "Clothes purchase",
    "date": "2024-06-17"
  },
  {
    "userId":'694bd9870d772e090cc6c65f',
    "amount": 1500,
    "category": "Utilities",
    "paymentMode": "UPI",
    "note": "Electricity bill",
    "date": "2024-06-15"
  },
  {
    "userId":'694bd9870d772e090cc6c65f',
    "amount": 300,
    "category": "Travel",
    "paymentMode": "Cash",
    "note": "Auto fare",
    "date": "2024-06-14"
  },
  {
    "userId":'694bd9870d772e090cc6c65f',
    "amount": 2500,
    "category": "Rent",
    "paymentMode": "Net Banking",
    "note": "June house rent",
    "date": "2024-06-01"
  },
  {
    "userId":'694bd9870d772e090cc6c65f',
    "amount": 999,
    "category": "Entertainment",
    "paymentMode": "Credit Card",
    "note": "Movie + snacks",
    "date": "2024-06-12"
  },
  {
    "userId":'694bd9870d772e090cc6c65f',
    "amount": 80,
    "category": "Food",
    "paymentMode": "Cash",
    "note": "Evening tea",
    "date": "2024-06-19"
  }
]


async function insertData(){
    await ExpenseModel.deleteMany({});
    const data_ins=await ExpenseModel.insertMany(data);
    console.log(data_ins);
}

insertData();