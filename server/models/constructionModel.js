const mongoose = require('mongoose');

const constructionSchema = new mongoose.Schema({
  residentName: {
    type: String,
    required: true
  },
  residentID: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  reasonOfRequest: {
    type: String,
    required: true
  },
  pickUpDate: {
    type: String,
    required: true
  },
  modeOfPayment: {
    type: String,
    required: true
  },
  reference: {
    type: String,
  },
  status: {
    type: String,
    default: 'New'
  }
});

const userConstruction = mongoose.model('Construction', constructionSchema);
module.exports = userConstruction;
