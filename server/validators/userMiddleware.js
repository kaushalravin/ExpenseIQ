const joi = require('joi');
const jwt = require('jsonwebtoken');
const userSchema = require('./userValidation').signupSchema;
const loginSchema = require('./userValidation').LoginSchema;
const ExpenseModel=require('../models/Expense');
const AppError = require('../utilities/AppError');

const getTokenFromRequest = (req) => {
    const cookieToken = req?.cookies?.token;
    if (cookieToken) return cookieToken;

    const authHeader = req.get("authorization") || req.get("Authorization");
    if (!authHeader) return null;

    const match = String(authHeader).match(/^Bearer\s+(.+)$/i);
    return match ? match[1] : null;
};

const validateUser = (req, res, next) => {
    try {
        const { error } = userSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }

        next();
    } catch (err) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
}

const validateUserLogin = (req, res, next) => {
    try {
        const { error } = loginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }

        next();
    } catch (err) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
}

const isLoggedIn = (req, res, next) => {
    const token = getTokenFromRequest(req);
    
    if (!token) {
        return next(new AppError("You are not authorized", 401));
    }
    try {
        
        const payload = jwt.verify(token, process.env.JWT_SECRET);//if this is not true it throws so kept it in try catch block
        req.user = payload;
        next();
    } catch (err) {
        next(new AppError("You are not authorized", 401));
    }
};


const isAuthorized = async (req, res, next) => {
    const token = getTokenFromRequest(req);

  if (!token) {
    return next(new AppError("You are not authorized", 401));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = req.params;


    const expense = await ExpenseModel.findById(id);
    if (!expense) {
      return next(new AppError("Expense not found", 404));
    }

    if (expense.userId.toString() !== payload.id) {//always use return next(new...) in async middlewares
      return next(new AppError("You are not authorized", 403));
    }

    req.user = payload;
    next();

  } catch (err) {
    return next(new AppError("You are not authorized", 401));
  }
};


module.exports = { validateUser, validateUserLogin, isLoggedIn ,isAuthorized};