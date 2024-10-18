const validator = require('../validate');
const validate = async (req, res, next) => {
    const validationRule = {
        "address": "required|string",
        "open": "required|bool"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}
module.exports = {
    validate
};