const express = require('express');
const router = express.Router();
const barangayCertificateController = require('../controllers/barangayCertificateController');


router.post("/", barangayCertificateController.createCertificate);
router.get("/",   barangayCertificateController.getCertificates);
router.put("/:id", barangayCertificateController.updateCertificate);
router.delete("/:id", barangayCertificateController.deleteCertificate);

module.exports = router;
