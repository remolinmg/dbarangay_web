const express = require('express');
const router = express.Router();
const barangayCertificateController = require('../controllers/barangayCertificateController');
const verifyToken = require('../middleware/authMiddleware')

router.post("/", barangayCertificateController.createCertificate);
router.get("/", /**verifyToken,**/  barangayCertificateController.getCertificates);
router.put("/:id", barangayCertificateController.updateCertificate);
router.delete("/:id", barangayCertificateController.deleteCertificate);

module.exports = router;
