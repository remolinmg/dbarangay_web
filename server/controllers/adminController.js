// controllers/adminController.js
const User = require('../models/userModel');

exports.adminLogin = async (req, res) => {
  const { email, password, type } = req.body;

  try {
    const check = await User.findOne({ email, password, type });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
};
