const express = require('express');
const platformRoutes = require('./platformRoutes');
const experimentRoutes = require('./experimentRoutes');
const nstRoutes = require('./NSTRoutes');

const router = express.Router();

// Core platform routes
router.use('/platform', platformRoutes);

// Experiment framework routes
router.use('/experiments', experimentRoutes);

// Individual experiment routes
router.use('/experiments/nst', nstRoutes);
module.exports = router;