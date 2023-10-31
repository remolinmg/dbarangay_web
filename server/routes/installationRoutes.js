
const express = require('express');
const router = express.Router();
const {
  createInstallation,
  getInstallations,
  deleteInstallation,
  updateInstallation,
  getUserInstallationPermit,
} = require('../controllers/installationController');

router.post('/', createInstallation);
router.get('/', getInstallations);
router.get('/:id', getUserInstallationPermit);
router.delete('/:id', deleteInstallation);
router.put('/:id', updateInstallation);

module.exports = router;
