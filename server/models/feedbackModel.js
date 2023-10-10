const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
    required: true
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;