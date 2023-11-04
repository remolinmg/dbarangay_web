const express = require('express');
const router = express.Router();
const multer = require('multer');
const blotterController = require('../controllers/blotterController');

// Set up Multer storage for uploading files
const blotterStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/blotter");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const blotterUpload = multer({ storage: blotterStorage });

// Routes
router.post('/', blotterUpload.single('file'), blotterController.createBlotter);
router.get('/', blotterController.getBlotter);
router.delete('/:id', blotterController.deleteBlotter);
router.put('/:id', blotterUpload.single('file'), blotterController.updateBlotter);

module.exports = router;
