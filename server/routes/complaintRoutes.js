const express = require('express');
const router = express.Router();
const multer = require('multer');
const complaintController = require('../controllers/complaintController');

// Set up Multer storage for uploading files
const complaintStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/complaint");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const complaintUpload = multer({ storage: complaintStorage });

// Routes
router.post('/', complaintUpload.single('file'), complaintController.createComplaint);
router.get('/', complaintController.getComplaint);
router.delete('/:id', complaintController.deleteComplaint);
router.put('/:id', complaintUpload.single('file'), complaintController.updateComplaint);

module.exports = router;
