const bcrypt = require("bcryptjs");

module.exports = function addSalt(password) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
  return hash;
}


