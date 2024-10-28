const router = express.Router();

router.get('/experiments', platformController.listExperiments);
router.get('/settings', platformController.getSettings);
router.put('/settings', platformController.updateSettings);

// Platform health and monitoring
router.get('/health', platformController.checkHealth);

module.exports = router;

