const express = require('express');
const router = express.Router();
const barangayCertificateController = require('../controllers/barangayCertificateController');
const verifyToken = require('../middleware/authMiddleware');


router.post("/", barangayCertificateController.createCertificate);
router.get("/",   barangayCertificateController.getCertificates);
router.get("/:id",  barangayCertificateController.getUserBrgyCert);
router.put("/:id", barangayCertificateController.updateCertificate);
router.delete("/:id", barangayCertificateController.deleteCertificate);

module.exports = router;
