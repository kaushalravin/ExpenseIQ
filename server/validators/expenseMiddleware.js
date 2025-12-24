const {ExpenseSchema} = require('./expenseValidation');

const validateExpense = (req, res, next) => {
    try {
        const {error} = ExpenseSchema.validate(req.body);

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


module.exports=validateExpense;