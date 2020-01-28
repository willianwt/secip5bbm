const mongoose = require('mongoose');
const moment = require('moment');

const UserSchema = new mongoose.Schema({
  rgm: String,
  password: String,
  email: String,
  name: String,
  grade: String,
  date: { type: String, default: moment().locale('pt-BR').format('LLL') },

});

module.exports = mongoose.model('User', UserSchema);
