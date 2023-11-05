const express = require('express');
const router = express.Router();

const healthController = require('../controllers/healthController');



// Routes
router.post('/',  healthController.createHealth);
router.get('/', healthController.getHealth);
router.delete('/:id', healthController.deleteHealth);
router.put('/:id', healthController.updateHealth);

module.exports = router;
