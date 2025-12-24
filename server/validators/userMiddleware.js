const joi=require('joi');
const userSchema=require('./userValidation');
const AppError = require('../utilities/AppError');

const validateUser=(req,res,next)=>{
    try {
        const {error} = userSchema.validate(req.body);

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

module.exports=validateUser;