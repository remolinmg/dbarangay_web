const express = require('express');
const router = express.Router();
const multer = require('multer');
const livelihoodController = require('../controllers/livelihoodController');

// Set up Multer storage for uploading files
const livelihoodStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/livelihood");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const livelihoodUpload = multer({ storage: livelihoodStorage });

// Routes
router.post('/', livelihoodUpload.single('file'), livelihoodController.createLivelihood);
router.get('/', livelihoodController.getAllLivelihood);
router.delete('/:id', livelihoodController.deleteLivelihood);
router.put('/:id', livelihoodUpload.single('file'), livelihoodController.updateLivelihood);

module.exports = router;
