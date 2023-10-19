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
      res.status(400).json('exist');
    } else {
      await Feedback.create(data);
      res.status(201).json('notexist');
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

// Handle DELETE request
async function deleteFeedback (req, res) {
  try {
    const deletedDocument = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createFeedback,
  getAllFeedback,
  deleteFeedback
};
