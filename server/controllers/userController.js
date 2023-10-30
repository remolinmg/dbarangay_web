const express = require('express');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const User = require('../models/userModel');
const crypto = require("crypto")
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const { rmSync } = require('fs');
const { error } = require('console');
app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, '../views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



const BRGYEMAIL = 'dbarangayapplication@gmail.com';
const PASSWORD = 'rrxc souh lvrv ybgm';

app.use(cors());

// Function to generate a unique reset token
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// forgot password page
exports.forgotpass = async (req, res) => {

  try {
    const { OTP, email } = req.body;
    const config = {
      service: 'gmail',
      auth: {
        user: BRGYEMAIL,
        pass: PASSWORD,
      }
    };

    const transporter = nodemailer.createTransport(config);

    const user = await User.findOne({ email });
    if (!user) {
      return res.send("User does not exist.");
    }

    // const OTP = Math.floor(100000 + Math.random() * 900000);

    console.log({ OTP });
    const MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: 'https://mailgen.js/'
      }
    });

    const passresetmail = {
      body: {
        name: 'Human Being',
        intro: 'This email contains a 6-digit verification code to reset the password of your DBarangay account.',
        action: {
          instructions: 'Your verification code:',
          button: {
            color: '#4BA2FF',
            text: OTP.toString(), // Include the verification code
            link: '',
          }
        },
        outro: 'Be sure to always keep your verification code somewhere safe but accessible.',
        signature: false
      }
    }

    const mail = MailGenerator.generate(passresetmail)

    const message = {
      from: BRGYEMAIL,
      to: email,
      subject: "D'Barangay Password Reset",
      html: mail
    }

    transporter.sendMail(message).then(() => {
      return res.status(201).json({
        msg: "you received an email"
      })
    })
  } catch (e) {
    res.status(500).json({ e })
    console.log(error)
  }
};

// reset password page
// exports.resetpass = async (req, res) => {
//   const { id, resetToken } = req.params;
//   console.log(req.params);

//   const user = await User.findOne({ _id: id });
//   if (!user) {
//     return res.json({ status: "User does not exist." });
//   }

//   const secretReset = "qqywe8791y62389qdy8wy89d1381734edih" + user.password;

//   try {
//     const verifyToken = jwt.verify(resetToken, secretReset);
//     res.render("resetPass.ejs", { _id: id, email: verifyToken.email });
//   } catch (e) {
//     res.send("Not Verified");
//     console.log(e);
//   }
// };

//update new password
exports.updatepass = async (req, res) => {
  const { email, password } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({ email });
    console.log(user.id);

    const updatedPassword = await User.findByIdAndUpdate(
      user.id,{ password:  hashedPassword } 
    );

    if (!updatedPassword) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedPassword);

  } catch (e) {
    console.log(e);
    res.status(500).json('Internal Server Error');
  }
};

//user signup
exports.signup = async (req, res) => {
  try {
    const {
      firstName, middleName, lastName, suffix, houseNumber, barangay, district, cityMunicipality, province, region, email, phoneNumber, nationality, sex, civilStatus, employmentStatus, homeOwnership, dateOfBirth, birthPlace, age, highestEducation, residenceClass, voterRegistration, password, companyName, position, status, type
    } = req.body;
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const lastCustomIdDoc = await User.findOne().sort({ _id: -1 });
    let newCustomId = currentDate + '01';
    if (lastCustomIdDoc) {
      const lastIncrement = parseInt(lastCustomIdDoc._id.slice(-2));
      const newIncrement = (lastIncrement + 1).toString().padStart(2, '0');
      newCustomId = currentDate + newIncrement;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomData = new User({
      _id: newCustomId,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      suffix: suffix,
      houseNumber: houseNumber,
      barangay: barangay,
      district: district,
      cityMunicipality: cityMunicipality,
      province, province,
      region: region,
      email: email,
      phoneNumber: phoneNumber,
      nationality: nationality,
      sex: sex,
      civilStatus: civilStatus,
      employmentStatus: employmentStatus,
      companyName: companyName,
      position: position,
      homeOwnership: homeOwnership,
      dateOfBirth: dateOfBirth,
      birthPlace: birthPlace,
      age: age,
      highestEducation, highestEducation,
      residenceClass, voterRegistration,
      password: hashedPassword,
      status: status,
      type: type
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

  if (!email || !password) {
    res.status(400).json({ message: 'all fields are required' })
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.status !== 'active') {
        res.status(400).json({ message: 'user inactive' })
      } else if (await bcrypt.compare(password, user.password)) {
        res.status(201).json({
          token: jwt.sign({ id: user.id, email: user.email }, 'y7y9u92348y5789yye789yq234785y78q34y78oghio', { expiresIn: '1d' })
        })
      }
    } else {
      res.status(400)
      throw new Error('Account not found')
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({ message: 'Login Error' })
  }
};

exports.getUser = async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const accountData = req.params.id;
    const data = await User.find({ _id: accountData });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserAdmin = async (req, res) => {
  try {
    const typesToFind = ['admin', 'superadmin'];
    const data = await User.find({ type: { $in: typesToFind } });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await User.find({ _id });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  const newFile = req.file; // The new image file

  try {
    // First, find the existing user
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if a new file was uploaded
    if (newFile) {
      // Upload the new image to Cloudinary
      const result = await cloudinary.uploader.upload(newFile.path, {
        folder: 'profile', // The folder for new images
      });

      // Update the user data with the new image URL
      existingUser.filename = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    // Update the user with new data (excluding the file)
    existingUser.set(formData);

    const updatedUser = await existingUser.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




