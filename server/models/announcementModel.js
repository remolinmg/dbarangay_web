const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
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

const announcement = mongoose.model('announcement', announcementSchema);
module.exports = announcement;
