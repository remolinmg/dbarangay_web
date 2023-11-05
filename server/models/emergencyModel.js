const mongoose = require('mongoose');

const barangayEmergencySchema = new mongoose.Schema({
  userId: { type: String }, //used UserID to show  data request in the flutter app

  currentLocation: {
    type: String,
    required: true,
    index: true,
  },

  phoneNumber: {
    type: String,
    required: true,
    index: true,
  },

  emergencyType: {
    type: String,
    required: true,
    index: true,
  },

  date: {
    type: Date,
    required: true,
    index: true,
  },


  status: {
    type: String,
    default: 'New',
  },
});

const userEmergency = mongoose.model('emergency', barangayEmergencySchema);

module.exports = userEmergency;

