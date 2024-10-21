const validator = require("../validate");
const validate = async (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    age: "required|integer",
    gender: "required|string",
    email: "required|string|email",
    employeeLevel: "required|integer",
    gymName: "required|string",
  };

  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};
module.exports = {
  validate,
};
