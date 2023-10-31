// models/barangayIndigency.js
const mongoose = require('mongoose');

const barangayIndigencySchema = new mongoose.Schema({
  residentName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  reasonOfRequest: {
    type: String,
    required: true,
  },
  pickUpDate: {
    type: String,
    required: true,
  },
  modeOfPayment: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
  },
  status: {
    type: String,
    default: 'New',
  },
});

const userIndigency = mongoose.model('BarangayIndigency', barangayIndigencySchema);

module.exports = userIndigency;