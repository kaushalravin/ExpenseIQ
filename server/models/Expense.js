const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  

  amount: {
    type: Number,
    required: true,
    min: [1, "Amount must be greater than 0"],
  },

  category: {
    type: String,
    required: true,
    enum: {
      values: [
        "Food",
        "Utilities",
        "Shopping",
        "Travel",
        "Rent",
        "Entertainment",
        "Other",
      ],
      message: "Invalid expense category",
    },
  },

  paymentMode: {
    type: String,
    required: true,
    enum: {
      values: [
        "Cash",
        "UPI",
        "Debit Card",
        "Credit Card",
        "Net Banking",
        "Other",
      ],
      message: "Invalid payment mode",
    },
  },

  note: {
    type: String,
    trim: true,
    default: "",
  },

  date: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
