const express = require('express');
const router = express.Router();
const multer = require('multer');
const promoteBusinessController = require('../controllers/promoteBusinessController');

// Set up Multer storage for uploading files
const promoteBusinessStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/promotebusiness");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const promoteBusinessUpload = multer({ storage: promoteBusinessStorage });

// Routes
router.post('/', promoteBusinessUpload.single('file'), promoteBusinessController.createPromoteBusiness);
router.get('/', promoteBusinessController.getPromoteBusiness);
router.delete('/:id', promoteBusinessController.deletePromoteBusiness);
router.put('/:id', promoteBusinessUpload.single('file'), promoteBusinessController.updatePromoteBusiness);

module.exports = router;
