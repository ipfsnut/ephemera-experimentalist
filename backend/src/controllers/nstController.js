const { generateNSTTrials } = require('../experimentLogic/nstLogic');
const config = require('../../config');

const nstController = {
  // Trial Management
  createTrial: (req, res) => {
    try {
      const trials = generateNSTTrials(config.numTrials, config.effortLevels[0]);
      res.json({ 
        trials,
        sessionId: Date.now().toString(),
        startTime: Date.now(),
        digit: trials[0]
      });
    } catch (error) {
      console.error('Trial creation error:', error);
      res.status(500).json({ error: error.message });
    }
  },
  getNextDigit: (req, res) => {
    const digit = Math.floor(Math.random() * 9) + 1;
    res.json({ digit });
  },

  submitResponse: (req, res) => {
    try {
      const { digit, response } = req.body;
      const result = handleNSTResponse(response, { digit });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  

  getProgress: (req, res) => {
    res.json({ currentTrial: 0, totalTrials: config.numTrials });
  },

  // Capture Control
  submitCapture: (req, res) => {
    res.json({ status: 'success', captureId: Date.now() });
  },

  getCaptureConfig: (req, res) => {
    res.json({ enabled: true, frequency: 'per_trial' });
  },

  // Session State
  getExperimentState: (req, res) => {
    res.json({ status: 'active', phase: 'trial' });
  },

  getTrialState: (req, res) => {
    res.json({ current: 'showing_digit', next: 'awaiting_response' });
  },

  // NST Configuration
  getNSTConfig: (req, res) => {
    res.json(config);
  },

  updateNSTConfig: (req, res) => {
    Object.assign(config, req.body);
    res.json(config);
  }
};

module.exports = nstController;