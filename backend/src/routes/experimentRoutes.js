const express = require('express');
const router = express.Router();
const experimentController = require('../controllers/experimentController');

// Experiment Management
router.get('/list', experimentController.listExperiments);
router.get('/:experimentId/about', experimentController.getExperimentInfo);
router.get('/:experimentId/config', experimentController.getConfig);
router.put('/:experimentId/config', experimentController.updateConfig);
router.get('/:experimentId/validate-config', experimentController.validateConfig);

// Data Export
router.get('/:experimentId/export/:sessionId', experimentController.exportSessionData);

// Session Control
router.post('/:experimentId/pause', experimentController.pauseExperiment);
router.post('/:experimentId/resume', experimentController.resumeExperiment);
router.post('/:experimentId/abort', experimentController.abortExperiment);

router.post('/:experimentId/start', (req, res) => 
  coordinator.initializeExperiment(req.params.experimentId, req.body.config));

router.post('/:experimentId/response', (req, res) => 
  coordinator.handleTrialResponse(req.params.sessionId, req.body));

router.get('/:experimentId/results', (req, res) => 
  coordinator.aggregateResults(req.params.sessionId));
module.exports = router;