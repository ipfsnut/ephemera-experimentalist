const express = require('express');
const platformRoutes = require('./platformRoutes');
const experimentRoutes = require('./experimentRoutes');
const dataRoutes = require('./dataRoutes');
const nstRoutes = require('./NSTRoutes');

const router = express.Router();

// Core platform routes
router.use('/platform', platformRoutes);

// Direct NST routes for specialized access
router.use('/experiments/nst', nstRoutes);

// General experiment framework routes
router.use('/experiments', experimentRoutes);

// Data management and export routes
router.use('/data', dataRoutes);

module.exports = router;