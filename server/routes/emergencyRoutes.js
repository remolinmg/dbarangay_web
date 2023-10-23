const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

// Define your routes here
router.get('/', emergencyController.getEmergency);
router.delete('/:id', emergencyController.deleteEmergency);
router.put('/:id', emergencyController.updateEmergency);

module.exports = router;
