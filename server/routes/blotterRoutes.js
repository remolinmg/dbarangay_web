const express = require('express');
const router = express.Router();
const blotterController = require('../controllers/blotterController');



// Routes
router.post('/', blotterController.createBlotter);
router.get('/', blotterController.getBlotter);
router.delete('/:id', blotterController.deleteBlotter);
router.put('/:id', blotterController.updateBlotter);

module.exports = router;
