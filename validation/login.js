const Validator = require("validator");

module.exports = function validateLogin(body) {
  const errors = {};

  let { email, password } = body;

  // coerce input values for Validator
  email = email + "";
  password = password + "";

  // email validation
  if (Validator.isEmpty(email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Invalid email format";
  }

  // password validation
  if (Validator.isEmpty(password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 && errors.constructor === Object
  };
};
