const Feedback = require('../models/feedbackModel');

// Create feedback
async function createFeedback(req, res) {
  const { date, feedback } = req.body;
  const data = {
    date: date,
    feedback: feedback
  };

  try {
    const check = await Feedback.findOne({ $and: [{ date: date }, { feedback: feedback }] });
    if (check) {
      res.json('exist');
    } else {
      await Feedback.create(data);
      res.json('notexist');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
}

// Get all feedback
async function getAllFeedback(req, res) {
  try {
    const data = await Feedback.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  }
}

module.exports = {
  createFeedback,
  getAllFeedback
};
