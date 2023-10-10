const express = require('express');
const router = express.Router();
const barangayIndigencyController = require('../controllers/barangayIndigencyController');

// POST /barangayindigency
router.post('/', barangayIndigencyController.createIndigency);

// GET /get/barangayindigency
router.get('/', barangayIndigencyController.getIndigencyList);

// DELETE /delete/barangayindigency/:id
router.delete('/:id', barangayIndigencyController.deleteIndigency);

// PUT /update/barangayindigency/:id
router.put('/:id', barangayIndigencyController.updateIndigency);

module.exports = router;
