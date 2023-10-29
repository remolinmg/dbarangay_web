const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/forgotpass', userController.forgotpass);
router.put('/updatepass', userController.updatepass);
// router.get('/resetpass/:id/:resetToken', userController.resetpass);
router.get('/get/user',  userController.getUser);
router.get('/get/useredit/:id', userController.getUserData);
router.get('/get/useradmin',  userController.getUserAdmin);
router.get('/get/userprofile/:id',  userController.getUserProfile);


module.exports = router;