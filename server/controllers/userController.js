const User = require('../models/userModel'); // Import the User model

//user signup
exports.signup = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    gender,
    religion,
    civilStatus,
    employmentStatus,
    highestEducation,
    nationality,
    address,
    householdMember,
    dateOfBirth,
    phoneNumber,
    email,
    password,
  } = req.body;

  const data = {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    gender: gender,
    religion: religion,
    civilStatus: civilStatus,
    employmentStatus: employmentStatus,
    highestEducation: highestEducation,
    nationality: nationality,
    address: address,
    householdMember: householdMember,
    dateOfBirth: dateOfBirth,
    phoneNumber: phoneNumber,
    email: email,
    password: password,
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


