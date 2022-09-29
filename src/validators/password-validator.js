const passwordComplexity = require("joi-password-complexity");
const complexityOptions = {
  min: 8,
  max: 12,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
};
function validatePassword(password) {
  return passwordComplexity(complexityOptions).validate(password);
}

module.exports = validatePassword;
