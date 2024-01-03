const StaffLogs = require('../models/staffLogsModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'all fields are required' })
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.type === 'resident') {
        res.status(400).json({ message: 'user is not an admin' })
      } else if (await bcrypt.compare(password, user.password)) {
        res.status(201).json({
          token: jwt.sign({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }, 'y7y9u92348y5789yye789yq234785y78q34y78oghio', { expiresIn: '1d' }), type: user.type
        })

        console.log(user.firstName);
        console.log(user.lastName);

        const date = new Date();
        const accessDate = date.toISOString().slice(0, 10);
        const accessTime = date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();
        const name = user.firstName + user.lastName;
        console.log(name);

        const newCustomData = new StaffLogs({
          name: name,
          email: email,
          accessDate: accessDate,
          accessTime: accessTime,
          activity: "Logged In"
        });
        await newCustomData.save();

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
    const accountData = localStorage.getItem('account');
    const data = await User.findOne({ accountData });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'all fields are required' })
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.type === 'resident') {
        res.status(400).json({ message: 'user is not an admin' })
      } else if (await bcrypt.compare(password, user.password)) {
        res.status(201).json({
          token: jwt.sign({ id: user.id, email: user.email }, 'y7y9u92348y5789yye789yq234785y78q34y78oghio', { expiresIn: '1d' }), type: user.type
        })

        const date = new Date();
        const accessDate = date.toISOString().slice(0, 10);
        const accessTime = date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds();

        const newCustomData = new StaffLogs({
          email: email,
          accessDate: accessDate,
          accessTime: accessTime
        });
        await newCustomData.save();

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
    const accountData = localStorage.getItem('account');
    const data = await User.findOne({ accountData });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};