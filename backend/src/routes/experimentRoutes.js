const express = require('express');
const router = express.Router();
const experimentController = require('../controllers/experimentController');
const nstRoutes = require('./NSTRoutes');

// Mount NST routes
router.use('/nst', nstRoutes);

// Generic experiment routes
router.get('/list', experimentController.listExperiments);
router.get('/:experimentId/about', experimentController.getExperimentInfo);

// General experiment endpoints
router.post('/:experimentId/start', experimentController.startExperiment);
router.get('/:experimentId/config', experimentController.getConfig);
router.put('/:experimentId/config', experimentController.updateConfig);

// Session management
router.post('/:experimentId/pause', experimentController.pauseExperiment);
router.post('/:experimentId/resume', experimentController.resumeExperiment);
router.post('/:experimentId/abort', experimentController.abortExperiment);

// Validation endpoints
router.get('/:experimentId/validate-config', experimentController.validateConfig);


module.exports = router;