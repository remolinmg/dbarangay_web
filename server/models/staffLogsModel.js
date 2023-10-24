const mongoose = require('mongoose');

const staffLogsSchema = new mongoose.Schema({

email:{
    type:String,
    required:true
},
accessDate:{
    type:String,
    required:true
},
});

const StaffLogs = mongoose.model("stafflogs", staffLogsSchema);
module.exports = StaffLogs;