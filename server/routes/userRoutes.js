const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/get/user',  userController.getUser);
router.get('/get/useredit/:id', userController.getUserData);


module.exports = router;