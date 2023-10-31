const mongoose = require('mongoose');

const businessClearanceSchema = new mongoose.Schema({
  businessName:{
    type:String,
    required:true
},
address:{
    type:String,
    required:true
},
residentName:{
  type:String,
  required:true
},
residentID: {
  type: String,
  required: true
},
type:{
  type:String,
  required:true
},
reasonOfRequest:{
    type:String,
    required:true
},
pickUpDate:{
    type:String,
    required:true
},
modeOfPayment:{
  type:String,
  required:true
},
reference:{
  type:String
},
status:{
  type:String,
  default:'New'
}
});

const userBusinessClearance = mongoose.model('BusinessClearance', businessClearanceSchema);

module.exports = userBusinessClearance;
