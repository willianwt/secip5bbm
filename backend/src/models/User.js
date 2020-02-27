const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  rgm: String,
  password: String,
  email: String,
  name: String,
  grade: String,
}, {
  timestamps: true,

});

module.exports = mongoose.model('User', UserSchema);
