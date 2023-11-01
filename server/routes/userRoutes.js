const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profile");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const userUpload = multer({ storage: userStorage, limits: { fieldSize: 25 * 1024 * 1024 } });

router.post('/signup', userUpload.single('file'),userController.signup);
router.post('/login', userController.login);
router.post('/forgotpass', userController.forgotpass);
router.put('/updatepass', userController.updatepass);
router.get('/get/user',  userController.getUser);
router.get('/get/useredit/:id', userController.getUserData);
router.get('/get/useradmin',  userController.getUserAdmin);
router.get('/get/userprofile/:id',  userController.getUserProfile);
router.put('/update/user/:id', userUpload.single('file'), userController.updateUser);

module.exports = router;