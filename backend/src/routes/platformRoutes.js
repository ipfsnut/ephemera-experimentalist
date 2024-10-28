const router = express.Router();

router.get('/status', platformController.getStatus);
router.get('/experiments', platformController.listExperiments);
router.get('/settings', platformController.getSettings);
router.put('/settings', platformController.updateSettings);

// Platform health and monitoring
router.get('/health', platformController.checkHealth);
router.get('/metrics', platformController.getMetrics);

module.exports = router;

