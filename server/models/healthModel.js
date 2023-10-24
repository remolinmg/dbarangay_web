const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
  date:String,
  reporter: String,
  respondents: String,
  type: String,
  address: String,
  status: String,
  filename: String,
});

const health = mongoose.model('health', healthSchema);

module.exports = health;