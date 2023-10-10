const express = require('express');
const router = express.Router();
const barangayIdController = require('../controllers/barangayIDController');

router.post('/', barangayIdController.createBarangayId);
router.get('/', barangayIdController.getAllBarangayIds);
router.delete('/:id', barangayIdController.deleteBarangayId);
router.put('/:id', barangayIdController.updateBarangayId);

module.exports = router;
