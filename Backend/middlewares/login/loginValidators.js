const { check, validationResult } = require("express-validator");

const doLoginValidatorsEmail = [
  check("email").isEmail().withMessage("Invalid email address").trim(),
];

const doLoginValidatorsPassword = [
  check("password").isLength({ min: 1 }).withMessage("Password is required"),
];

const doLoginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(200).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  doLoginValidatorsEmail,
  doLoginValidatorsPassword,
  doLoginValidationHandler,
};
