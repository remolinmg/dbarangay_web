const mongoose = require('mongoose');

const userRegistrationSchema = new mongoose.Schema({
_id:{
    type:String,
    required: true,
},
firstName:{
    type:String,
    required: true,
},
middleName:{
    type:String,
    required: true,
},
lastName:{
    type:String,
    required: true,
},
suffix:{
    type:String,
},
houseNumber:{
    type:String,
    required: true,
},
barangay:{
    type:String,
    required: true,
},
district:{
    type:String,
    required: true,
},
cityMunicipality:{
    type:String,
    required: true,
},
province:{
    type:String,
    required: true,
},
region:{
    type:String,
    required: true,
},
email:{
    type:String,
    required: true,
},
phoneNumber:{
    type:String,
    required: true,
},
nationality:{
    type:String,
    required: true,
},
sex:{
    type:String,
    required: true,
},
civilStatus:{
    type:String,
    required: true,
},
employmentStatus:{
    type:String,
    required: true,
},
companyName:{
    type:String,
},
position:{
    type:String,
},
homeOwnership:{
    type:String,
    required: true,
},
dateOfBirth:{
    type:String,
    required: true,
},
birthPlace:{
    type:String,
    required: true,
},
age:{
    type:String,
    required: true,
},
highestEducation:{
    type:String,
    required: true,
},
residenceClass:{
    type:String,
},
votersRegistration:{
    type:String,
    required: true,
},
password:{
    type:String,
    required: true,
},
type:{
    type:String,
    default:'resident'
},
status:{
    type:String,
    default:'active'
},
 filename: {
    public_id: {
      type: String,
      required: true
    },
    url:{
      type: String,
      required: true
    }
  },
});

const User = mongoose.model("User", userRegistrationSchema);
module.exports = User;