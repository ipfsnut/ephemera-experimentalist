const express = require('express');
const router = express.Router();
const nstController = require('../controllers/nstController');

// Trial Management
router.get('/next-digit', nstController.getNextDigit);
router.post('/response', nstController.submitResponse);
router.get('/progress', nstController.getProgress);

// Capture Control
router.post('/capture', nstController.submitCapture);
router.get('/capture-config', nstController.getCaptureConfig);

// Session State
router.get('/state', nstController.getExperimentState);
router.get('/trial-state', nstController.getTrialState);

// NST Configuration
router.get('/config', nstController.getNSTConfig);
router.put('/config', nstController.updateNSTConfig);

module.exports = router;