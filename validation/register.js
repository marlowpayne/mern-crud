const Validator = require("validator");

module.exports = function validateRegister(body) {
  const errors = {};

  let { email, password, passwordConfirm } = body;

  // coerce input values for Validator
  email = email + "";
  password = password + "";
  passwordConfirm = passwordConfirm + "";

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
  if (Validator.isEmpty(passwordConfirm)) {
    errors.passwordConfirm = "Password confirmation is required";
  }
  if (!Validator.isLength(password, { min: 8, max: 72 })) {
    errors.password = "Password must be at least 8 characters long";
  }
  if (!Validator.equals(password, passwordConfirm)) {
    errors.passwordConfirm = "Password confirmation does not match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 && errors.constructor === Object
  };
};
