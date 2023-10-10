const express = require('express');
const router = express.Router();
const multer = require('multer');
const officialController = require('../controllers/officialController');

// Set up Multer storage for uploading files
const officialStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/official");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const officialUpload = multer({ storage: officialStorage });

// Routes
router.post('/', officialUpload.single('file'), officialController.createOfficial);
router.get('/', officialController.getAllOfficials);
router.delete('/:id', officialController.deleteOfficial);
router.put('/:id', officialUpload.single('file'), officialController.updateOfficial);

module.exports = router;
