const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  rgm: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,

});

module.exports = mongoose.model('User', UserSchema);
