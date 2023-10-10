const mongoose = require('mongoose');

const livelihoodSchema = new mongoose.Schema({
  what: String,
  where: String,
  when: String,
  who: String,
  filename: String,
});

const livelihood = mongoose.model('livelihood', livelihoodSchema);

module.exports = livelihood;
