const mongoose = require('mongoose');

const promoteBusinessSchema = new mongoose.Schema({
  businessName: String,
  address: String,
  hours: String,
  category: String,
  contact: String,
  residentName: String,
  filename: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
});
const promoteBusiness = mongoose.model('promotebusiness', promoteBusinessSchema);

module.exports = promoteBusiness;
