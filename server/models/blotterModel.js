const mongoose = require('mongoose');

const blotterSchema = new mongoose.Schema({
  date:String,
  complainant: String,
  defendant: String,
  type: String,
  address: String,
  kind: String,
  status: String,
  filename: String,
});

const blotter = mongoose.model('blotter', blotterSchema);

module.exports = blotter;