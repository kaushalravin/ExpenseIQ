const Joi = require("joi");

const ExpenseSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Amount must be a number",
      "number.positive": "Amount must be greater than 0",
      "any.required": "Amount is required",
    }),

  category: Joi.string()
    .valid(
      "Food",
      "Utilities",
      "Shopping",
      "Travel",
      "Rent",
      "Entertainment",
      "Other"
    )
    .required()
    .messages({
      "any.only": "Invalid expense category",
      "any.required": "Category is required",
    }),

  paymentMode: Joi.string()
    .valid(
      "Cash",
      "UPI",
      "Debit Card",
      "Credit Card",
      "Net Banking",
      "Other"
    )
    .required()
    .messages({
      "any.only": "Invalid payment mode",
      "any.required": "Payment mode is required",
    }),

  note: Joi.string()
    .allow("")
    .optional(),

  date: Joi.date()
    .required()
    .messages({
      "date.base": "Invalid date format",
      "any.required": "Date is required",
    }),
});

module.exports = {
  ExpenseSchema,
};
