const express = require('express');
const router = express.Router();
const staffLogsController = require('../controllers/staffLogsController');

// Routes
router.get('/', staffLogsController.getStaffLogs);


module.exports = router;
