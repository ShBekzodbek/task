const Joi = require("joi");

function validateFullname(fullname) {
  const schema = Joi.object().key({
    fullname: Joi.string().min(3).max(200).required(),
    phone: Joi.number().min(9).max(12).required(),
  });
  return schema.validate(fullname);
}

function validateUser(user) {
  const schema = Joi.object().keys({
    username: Joi.string().min(3).max(200).required(),
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

module.exports.validateFullname = validateFullname;

module.exports.validate = validateUser;