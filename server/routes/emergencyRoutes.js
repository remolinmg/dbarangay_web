const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

// Define your routes here
router.put('/:id', emergencyController.updateEmergency);
router.get('/', emergencyController.getEmergency);
router.delete('/:id', emergencyController.deleteEmergency);
module.exports = router;
