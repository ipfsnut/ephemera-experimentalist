const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/export/:experimentId', dataController.exportData);
router.get('/analysis/:experimentId', dataController.getAnalysis);
router.get('/results/:sessionId', dataController.getResults);
router.post('/backup', dataController.createBackup);
router.get('/sessions/:sessionId/timeline', dataController.getSessionTimeline);
router.post('/sessions/:sessionId/annotations', dataController.addAnnotation);
router.get('/aggregate/:experimentId', dataController.getAggregateStats);

// Routes for trial data
router.post('/trials/:sessionId', dataController.saveTrial);
router.get('/trials/:sessionId', dataController.getTrials);
router.get('/metrics/:experimentId/performance', dataController.getPerformanceMetrics);

module.exports = router;
