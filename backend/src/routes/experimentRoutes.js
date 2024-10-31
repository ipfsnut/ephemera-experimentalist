const express = require('express');
const router = express.Router();
const experimentController = require('../controllers/experimentController');

// Experiment Management
router.get('/list', experimentController.listExperiments);
router.get('/:experimentId/about', experimentController.getExperimentInfo);
router.get('/:experimentId/config', experimentController.getConfig);
router.put('/:experimentId/config', experimentController.updateConfig);
router.get('/:experimentId/validate-config', experimentController.validateConfig);
router.post('/:experimentId/response', experimentController.handleResponse);



// Session Control
router.post('/:experimentId/start', experimentController.startExperiment);
router.post('/:experimentId/pause', experimentController.pauseExperiment);
router.post('/:experimentId/resume', experimentController.resumeExperiment);
router.post('/:experimentId/abort', experimentController.abortExperiment);

module.exports = router;