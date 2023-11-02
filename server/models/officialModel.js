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
  filename: {
    public_id: {
      type: String,
      required: true
    },
    url:{
      type: String,
      required: true
    }
  },
});

const official = mongoose.model('official', officialSchema);

module.exports = official;
