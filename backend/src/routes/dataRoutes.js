const router = express.Router();

router.get('/export/:experimentId', dataController.exportData);
router.get('/analysis/:experimentId', dataController.getAnalysis);
router.get('/results/:sessionId', dataController.getResults);
router.post('/backup', dataController.createBackup);

// Enhanced data management
router.get('/sessions/:sessionId/timeline', dataController.getSessionTimeline);
router.post('/sessions/:sessionId/annotations', dataController.addAnnotation);
router.get('/aggregate/:experimentId', dataController.getAggregateStats);

module.exports = router;

