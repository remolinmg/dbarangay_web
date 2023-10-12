const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Create feedback
router.post('/', feedbackController.createFeedback);

// Get all feedback
router.get('/', feedbackController.getAllFeedback);

// Delete feedback
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
