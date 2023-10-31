const express = require('express');
const router = express.Router();
const constructionController = require('../controllers/constructionController');

// Define your routes here
router.post('/', constructionController.createConstruction);
router.get('/', constructionController.getConstruction);
router.get('/:id', constructionController.getUserConstructionPermit);
router.delete('/:id', constructionController.deleteConstruction);
router.put('/:id', constructionController.updateConstruction);

module.exports = router;
