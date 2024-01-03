const mongoose = require('mongoose');

const staffLogsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    accessDate: {
        type: String,
        required: true
    },
    accessTime: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
});

const StaffLogs = mongoose.model("stafflogs", staffLogsSchema);
module.exports = StaffLogs;