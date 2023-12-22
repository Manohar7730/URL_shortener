const joi = require("joi");

// Validation schema for user registration
const registerValidation = (data) => {
  const schema = joi.object({
    email: joi.string().email().min(6).required(),
    password: joi
      .string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"))
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.",
      }),
    confirmPassword: joi
      .string()
      .valid(joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords must match.",
      }),
  });

  return schema.validate(data);
};

// Export the registration validation function
module.exports.registerValidation = registerValidation;

// Validation schema for user login
const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().email().min(6).required(),
    password: joi
      .string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"))
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.",
      }),
  });

  return schema.validate(data);
};

// Export the login validation function
module.exports.loginValidation = loginValidation;
