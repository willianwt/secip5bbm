const mongoose = require('mongoose');

const ProtocolSchema = new mongoose.Schema({
  protocol: String,
  area: String,
  type: String,
  district: String,
  tax: String,
  date: String,
  situation: String,
  division: String,
  observations: String,
  isention: String,
  inspection: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Protocol', ProtocolSchema);
