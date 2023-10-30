const mongoose = require('mongoose');

const userRegistrationSchema = new mongoose.Schema({
_id:{
    type:String,
    
},
firstName:{
    type:String,
    
},
middleName:{
    type:String,
    
},
lastName:{
    type:String,
    
},
suffix:{
    type:String,
},
houseNumber:{
    type:String,
    
},
barangay:{
    type:String,
    
},
district:{
    type:String,
    
},
cityMunicipality:{
    type:String,
    
},
province:{
    type:String,
    
},
region:{
    type:String,
    
},
email:{
    type:String,
    
},
phoneNumber:{
    type:String,
    
},
nationality:{
    type:String,
    
},
sex:{
    type:String,
    
},
civilStatus:{
    type:String,
    
},
employmentStatus:{
    type:String,
    
},
companyName:{
    type:String,
 
},
position:{
    type:String,

},
homeOwnership:{
    type:String,
    
},
dateOfBirth:{
    type:String,
    
},
birthPlace:{
    type:String,
    
},
age:{
    type:String,
    
},
highestEducation:{
    type:String,
    
},
residenceClass:{
    type:String,
},
voterRegistration:{
    type:String,
    
},
password:{
    type:String,
    
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
    },
    url:{
      type: String,
    }
  },
});

const User = mongoose.model("User", userRegistrationSchema);
module.exports = User;