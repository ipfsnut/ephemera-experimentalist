const express = require('express');
const eventRoutes = require('./eventRoutes');
const experimentRoutes = require('./experimentRoutes');

const router = express.Router();

// General application routes
router.use('/events', eventRoutes);

// Experiment-specific routes
router.use('/experiments', experimentRoutes);

module.exports = router;
