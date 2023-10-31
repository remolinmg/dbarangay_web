// routes/businessClearanceRoutes.js
const express = require('express');
const router = express.Router();
const businessClearanceController = require('../controllers/businessClearanceController');

router.post('/', businessClearanceController.createBusinessClearance);
router.get('/', businessClearanceController.getBusinessClearances);
router.get('/:id', businessClearanceController.getUserBusinessClearance);
router.delete('/:id', businessClearanceController.deleteBusinessClearance);
router.put('/:id', businessClearanceController.updateBusinessClearance);

module.exports = router;
