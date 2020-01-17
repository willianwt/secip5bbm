const mongoose = require('mongoose');
const moment = require('moment');

const ProtocolSchema = new mongoose.Schema({
  protocol: String,
  area: String,
  type: String,
  district: String,
  tax: String,
  date: { type: String, default: moment().locale('pt-BR').format('LLL') },
  status: String,
  division: String,
  isention: String,
  observations: String,
});

module.exports = mongoose.model('Protocol', ProtocolSchema);
