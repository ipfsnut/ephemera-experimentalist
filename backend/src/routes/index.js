const express = require('express');
const platformRoutes = require('./platformRoutes');
const experimentRoutes = require('./experimentRoutes');
const nstRoutes = require('./NSTRoutes');

const router = express.Router();

// Specific experiment routes first
router.use('/experiments/nst', nstRoutes);

// Framework routes
router.use('/experiments', experimentRoutes);

// Platform routes
router.use('/platform', platformRoutes);

module.exports = router;