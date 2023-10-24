const express = require('express');
const router = express.Router();
const multer = require('multer');
const healthController = require('../controllers/healthController');

// Set up Multer storage for uploading files
const healthStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/medical");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const healthUpload = multer({ storage: healthStorage });

// Routes
router.post('/', healthUpload.single('file'), healthController.createHealth);
router.get('/', healthController.getHealth);
router.delete('/:id', healthController.deleteHealth);
router.put('/:id', healthUpload.single('file'), healthController.updateHealth);

module.exports = router;
