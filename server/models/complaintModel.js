const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  date:String,
  complainant: String,
  defendant: String,
  complainttype: String,
  address: String,
  kind: String,
  status: String,
  filename: String,
  documentation: String,
});

const complaint = mongoose.model('complaint', complaintSchema);

module.exports = complaint;