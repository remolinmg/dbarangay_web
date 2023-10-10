const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const multer = require('multer');

const announcementStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/announcement");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const announcementUpload = multer({ storage: announcementStorage });

router.post('/', announcementUpload.single('file'), announcementController.createAnnouncement);
router.get('/', announcementController.getAllAnnouncements);
router.delete('/:id', announcementController.deleteAnnouncement);
router.put('/:id', announcementUpload.single('file'), announcementController.updateAnnouncement);

module.exports = router;
