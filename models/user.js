const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

// User Schema
const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = module.exports = mongoose.model('users', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByName = function(name, callback) {
  const query = { name: name };
  User.findById(query, callback);
}

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
