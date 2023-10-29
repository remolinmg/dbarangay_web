const mongoose = require('mongoose');

const livelihoodSchema = new mongoose.Schema({
  what: String,
  where: String,
  when: String,
  who: String,
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

const livelihood = mongoose.model('livelihood', livelihoodSchema);

module.exports = livelihood;
