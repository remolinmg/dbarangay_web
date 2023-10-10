const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  what: String,
  where: String,
  when: String,
  who: String,
  filename: String,
});

const announcement = mongoose.model('announcement', announcementSchema);
module.exports = announcement;
