const {ExpenseSchema} = require('./expenseValidation');

const validateExpense = (req, res, next) => {
    try {
        const { error, value } = ExpenseSchema.validate(req.body, {
            abortEarly: true,
            allowUnknown: true,
            stripUnknown: true,
            convert: true
        });

        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }

        req.body = value;

        next();
    } catch (err) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }
}


module.exports=validateExpense;