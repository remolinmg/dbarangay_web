const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  date:String,
  complainant: String,
  defendant: String,
  type: String,
  address: String,
  status: String,
  filename: String,
});

const complaint = mongoose.model('complaint', complaintSchema);

module.exports = complaint;