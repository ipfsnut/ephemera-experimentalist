const { generateNSTTrials, handleNSTResponse, getCurrentDigit } = require('../experimentLogic/nstLogic');
const config = require('../../config');

const nstController = {
  createTrial: (req, res) => {
    try {
      console.log('CreateTrial - Starting trial generation');
      const trials = generateNSTTrials(config.numTrials, config.effortLevels[0]);
      
      // Use session methods correctly
      req.session.trials = trials;
      req.session.sessionId = Date.now().toString();
      req.session.startTime = Date.now();
      req.session.currentTrialIndex = 0;
      req.session.currentDigitIndex = 0;
      req.session.completedTrials = [];
      req.session.phase = 'trial';
      req.session.trialPhase = 'showing_digit';
      
      const response = {
        sessionId: req.session.sessionId,
        currentDigit: getCurrentDigit(trials[0]),
        totalTrials: trials.length,
        startTime: req.session.startTime
      };
      
      res.json(response);
    } catch (error) {
      console.error('CreateTrial - Error:', error);
      res.status(500).json({ error: error.message });
    }
  },
  getNextDigit: (req, res) => {
    try {
      if (!req.session.trials) {
        throw new Error('No active session found');
      }

      const { trialIndex, digitIndex } = req.query;
      const currentTrial = req.session.trials[trialIndex];

      if (!currentTrial) {
        throw new Error('Invalid trial index');
      }

      req.session.currentDigitIndex = digitIndex;
      const digit = getCurrentDigit(currentTrial);

      if (digit === null) {
        req.session.currentTrialIndex++;
        req.session.currentDigitIndex = 0;
      }

      const response = {
        digit,
        trialIndex,
        digitIndex,
        isLastDigit: digit === null
      };
      
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  submitResponse: (req, res) => {
    try {
      if (!req.session.trials) {
        throw new Error('No active session found');
      }

      const { response: userResponse } = req.body;
      const currentTrial = req.session.trials[req.session.currentTrialIndex];
      const result = handleNSTResponse(userResponse, currentTrial);

      req.session.currentDigitIndex++;
      if (req.session.currentDigitIndex >= currentTrial.digits.length) {
        req.session.completedTrials.push(result);
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getProgress: (req, res) => {
    try {
      console.log('GetProgress - Session state:', req.session);
      
      if (!req.session) {
        throw new Error('No active session found');
      }

      const progress = {
        currentTrial: req.session.currentTrialIndex,
        totalTrials: config.numTrials,
        completedTrials: req.session.completedTrials,
        currentDigitIndex: req.session.currentDigitIndex
      };
      console.log('GetProgress - Sending progress:', progress);
      res.json(progress);
    } catch (error) {
      console.error('GetProgress - Error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  submitCapture: (req, res) => {
    console.log('SubmitCapture - Request received');
    const captureId = Date.now();
    const response = {
      status: 'success',
      captureId,
      timestamp: Date.now()
    };
    console.log('SubmitCapture - Sending response:', response);
    res.json(response);
  },

  getCaptureConfig: (req, res) => {
    console.log('GetCaptureConfig - Request received');
    const response = {
      enabled: config.captureEnabled || true,
      frequency: config.captureFrequency || 'per_trial'
    };
    console.log('GetCaptureConfig - Sending config:', response);
    res.json(response);
  },

  getExperimentState: (req, res) => {
    try {
      if (!req.session.trials) {
        throw new Error('No active session found');
      }

      const state = {
        status: 'active',
        phase: req.session.phase,
        startTime: req.session.startTime,
        currentTrial: req.session.currentTrialIndex,
        currentDigitIndex: req.session.currentDigitIndex
      };
      res.json(state);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTrialState: (req, res) => {
    try {
      if (!req.session.trials) {
        throw new Error('No active session found');
      }

      const state = {
        current: req.session.trialPhase,
        next: req.session.trialPhase === 'showing_digit' ? 'awaiting_response' : 'showing_digit',
        timestamp: Date.now()
      };
      res.json(state);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProgress: (req, res) => {
    try {
      if (!req.session.trials) {
        throw new Error('No active session found');
      }

      const progress = {
        currentTrial: req.session.currentTrialIndex,
        totalTrials: config.numTrials,
        completedTrials: req.session.completedTrials,
        currentDigitIndex: req.session.currentDigitIndex
      };
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getNSTConfig: (req, res) => {
    console.log('GetNSTConfig - Request received');
    console.log('GetNSTConfig - Sending config:', config);
    res.json(config);
  },

  updateNSTConfig: (req, res) => {
    console.log('UpdateNSTConfig - Request body:', req.body);
    const updatedConfig = Object.assign({}, config, req.body);
    console.log('UpdateNSTConfig - Updated config:', updatedConfig);
    res.json(updatedConfig);
  }
};

module.exports = nstController;