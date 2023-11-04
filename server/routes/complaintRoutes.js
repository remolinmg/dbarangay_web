const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');


// Routes
router.post('/', complaintController.createComplaint);
router.get('/', complaintController.getComplaint);
router.delete('/:id', complaintController.deleteComplaint);
router.put('/:id',complaintController.updateComplaint);

module.exports = router;
