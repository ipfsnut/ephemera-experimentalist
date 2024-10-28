const express = require('express');
const router = express.Router();
const nstController = require('../../controllers/nstController');

// NST-specific configuration
router.get('/config', nstController.getConfig);
router.put('/config', nstController.updateConfig);

// Trial management
router.post('/start', nstController.startExperiment);
router.get('/:sessionId/next-digit', nstController.getNextDigit);
router.post('/:sessionId/response', nstController.submitResponse);

// Data collection
router.post('/:sessionId/capture', nstController.submitCapture);
router.get('/:sessionId/state', nstController.getExperimentState);
router.get('/:sessionId/results', nstController.getResults);

// Enhanced trial management
router.get('/:sessionId/progress', nstController.getProgress);
router.post('/:sessionId/checkpoint', nstController.saveCheckpoint);
router.get('/:sessionId/performance', nstController.getPerformanceMetrics);

// Calibration and setup
router.post('/:sessionId/calibrate', nstController.calibrateSession);

module.exports = router;