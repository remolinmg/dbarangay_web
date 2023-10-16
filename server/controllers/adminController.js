// controllers/adminController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

exports.adminLogin = async (req, res) => {
  const { email, password, type } = req.body;

  if(!email || !password){
    res.status(400).json({message: 'all fields are required'})
  }

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      if(user.type !== 'admin'){
        res.status(400).json({message: 'user is not admin'})
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
