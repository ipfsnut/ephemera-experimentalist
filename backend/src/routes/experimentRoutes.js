const express = require('express');
const router = express.Router();
const experimentController = require('../controllers/experimentController');

router.post('/start', experimentController.startExperiment);
router.get('/:sessionId/next', experimentController.getNextDigit);
router.post('/:sessionId/response', experimentController.submitResponse);
router.post('/:sessionId/capture', experimentController.submitCapture);
router.get('/:sessionId/state', experimentController.getExperimentState);

module.exports = router;