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
  fiscal: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  changes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId },
      modification: String,
      data: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Protocol', ProtocolSchema);
