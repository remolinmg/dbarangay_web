const User = require('../models/userModel'); // Import the User model

//user signup
exports.signup = async (req, res) => {
  const {
    firstName, middleName, lastName, suffix, houseNumber,barangay,district,cityMunicipality,province,region, email, phoneNumber,nationality,sex, civilStatus, employmentStatus,homeOwnership, dateOfBirth,birthPlace,age,highestEducation,residenceClass,voterRegistration,password,companyName,position,status,type
  } = req.body;

  const data = {
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
  };

  try {
    const check = await User.findOne({ email: email });
    if (check) {
      res.json('exist');
    } else {
      res.json('notexist');
      await User.create(data);
    }
  } catch (e) {
    res.json('notexist');
  }
};

//user login

exports.login = async (req, res) => {
  const { email, password, status } = req.body;

  try {
    const user = await User.findOne({ email, password, status });

    if (user) {
      res.json('exist');
    } else {
      res.json('notexist');
    }
  } catch (e) {
    res.json('notexist');
  }
};


