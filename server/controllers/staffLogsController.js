const StaffLogs = require('../models/staffLogsModel');

// Function to get Staff Logs
exports.getStaffLogs = async (req, res) => {
    try {
        const data = await StaffLogs.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



