const express = require('express');
const platformController = require('../controllers/platformController');
const router = express.Router();

router.get('/health', platformController.checkHealth);
router.get('/experiments', platformController.listExperiments);
router.get('/settings', platformController.getSettings);
router.put('/settings', platformController.updateSettings);

module.exports = router;
