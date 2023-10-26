// controllers/adminController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
    res.status(400).json({message: 'all fields are required'})
  }

  try {
    const user = await User.findOne({email});
    if (user) {
      if(user.type ==='resident'){
        res.status(400).json({message: 'user is not an admin'})
      }else if (await bcrypt.compare(password, user.password)){
        res.status(201).json({
          token: jwt.sign({id: user.id, email: user.email},'y7y9u92348y5789yye789yq234785y78q34y78oghio', {expiresIn: '1d'}),type: user.type
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

