const mongoose = require('mongoose');

const barangayEmergencySchema = new mongoose.Schema({
userId: {type: String}, //used UserID to show  data request in the flutter app

currentLocation:{
    type: String,
},

residentName:{
  type: String,
},

phoneNumber:{
    type: String,
  },

  emergencyType:{
    type: String,
  },
  date:{
    type: Date,
},
  status: {
    type: String,
  },
});

const userEmergency = mongoose.model('emergency', barangayEmergencySchema);

module.exports = userEmergency;

