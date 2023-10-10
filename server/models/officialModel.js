const mongoose = require('mongoose');

const officialSchema = new mongoose.Schema({
  position: String,
  firstName: String,
  middleName: String,
  lastName: String,
  contact: String,
  address: String,
  startTerm: String,
  endTerm: String,
  filename: String,
});

const official = mongoose.model('official', officialSchema);

module.exports = official;
