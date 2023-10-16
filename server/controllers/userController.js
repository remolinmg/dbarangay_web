const User = require('../models/userModel'); // Import the User model
const jwt = require('jsonwebtoken')

//user signup
exports.signup = async (req, res) => {
  try{
  const {
    firstName, middleName, lastName, suffix, houseNumber,barangay,district,cityMunicipality,province,region, email, phoneNumber,nationality,sex, civilStatus, employmentStatus,homeOwnership, dateOfBirth,birthPlace,age,highestEducation,residenceClass,voterRegistration,password,companyName,position,status,type
  } = req.body;
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const lastCustomIdDoc = await User.findOne().sort({ _id: -1 });
  let newCustomId = currentDate + '01';
  if (lastCustomIdDoc) {
    const lastIncrement = parseInt(lastCustomIdDoc._id.slice(-2));
    const newIncrement = (lastIncrement + 1).toString().padStart(2, '0');
    newCustomId = currentDate + newIncrement;
  }
  const newCustomData = new User( {
    _id: newCustomId,
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    suffix:suffix,
    houseNumber:houseNumber,
    barangay:barangay,
    district:district,
    cityMunicipality:cityMunicipality,
    province,province,
    region:region,
    email: email,
    phoneNumber:phoneNumber,
    nationality:nationality,
    sex:sex,
    civilStatus:civilStatus,
    employmentStatus:employmentStatus,
    companyName:companyName,
    position:position,
    homeOwnership:homeOwnership,
    dateOfBirth:dateOfBirth,
    birthPlace:birthPlace,
    age:age,
    highestEducation,highestEducation,
    residenceClass,voterRegistration,
    password: password,
    status:status,
    type:type
  });
  await newCustomData.save();
  res.json({ success: true, message: 'Custom Data created successfully' });
} catch (error) {
  res.status(500).json({ success: false, message: 'Error creating custom data' });
}
};

//user login

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
    res.status(400).json({message: 'all fields are required'})
  }

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      if(user.status !== 'active'){
        res.status(400).json({message: 'user inactive'})
      }else{
        res.status(201).json({
          token: jwt.sign({id: user.id, email: user.email},'y7y9u92348y5789yye789yq234785y78q34y78oghio', {expiresIn: '1d'})
        })
      }
    } else {
      res.status(400)
      throw new Error('Account not found')
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({message:'Login Error'})
  }
};


