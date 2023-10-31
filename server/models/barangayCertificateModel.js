const mongoose = require('mongoose');

const barangayCertificateSchema = new mongoose.Schema({
  residentName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
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

const userCertificate = mongoose.model('barangaycertificate', barangayCertificateSchema);

module.exports = userCertificate;

