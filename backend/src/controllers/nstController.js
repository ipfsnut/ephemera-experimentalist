const { generateNSTTrials, handleNSTResponse, getCurrentDigit } = require('../experimentLogic/nstLogic');
const config = require('../../config');

const nstController = {
  createTrial: (req, res) => {
    try {
      console.log('CreateTrial - Starting trial generation');
      const trials = generateNSTTrials(config.numTrials, config.effortLevels[0]);
      console.log('CreateTrial - Generated trials:', trials);
      
      const sessionId = Date.now().toString();
      req.session = {
        trials,
        sessionId,
        startTime: Date.now(),
        currentTrialIndex: 0,
        currentDigitIndex: 0,
        completedTrials: [],
        phase: 'trial',
        trialPhase: 'showing_digit'
      };
      console.log('CreateTrial - Initialized session:', req.session);

      const response = {
        sessionId,
        currentDigit: getCurrentDigit(trials[0]),
        totalTrials: trials.length,
        startTime: req.session.startTime
      };
      console.log('CreateTrial - Sending response:', response);
      res.json(response);
    } catch (error) {
      console.error('CreateTrial - Error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  getNextDigit: (req, res) => {
    try {
      console.log('GetNextDigit - Session state:', req.session);
      console.log('GetNextDigit - Query params:', req.query);

      if (!req.session?.trials) {
        throw new Error('No active session found');
      }

      const { trialIndex, digitIndex } = req.query;
      const currentTrial = req.session.trials[trialIndex];
      console.log('GetNextDigit - Current trial:', currentTrial);

      if (!currentTrial) {
        throw new Error('Invalid trial index');
      }

      currentTrial.currentDigitIndex = digitIndex;
      const digit = getCurrentDigit(currentTrial);
      console.log('GetNextDigit - Retrieved digit:', digit);

      if (digit === null) {
        req.session.currentTrialIndex++;
        req.session.currentDigitIndex = 0;
        console.log('GetNextDigit - Moving to next trial:', req.session.currentTrialIndex);
      }

      const response = {
        digit,
        trialIndex,
        digitIndex,
        isLastDigit: digit === null
      };
      console.log('GetNextDigit - Sending response:', response);
      res.json(response);
    } catch (error) {
      console.error('GetNextDigit - Error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  submitResponse: (req, res) => {
    try {
      console.log('SubmitResponse - Session state:', req.session);
      console.log('SubmitResponse - Request body:', req.body);

      if (!req.session?.trials) {
        throw new Error('No active session found');
      }

      const { response } = req.body;
      const currentTrial = req.session.trials[req.session.currentTrialIndex];
      console.log('SubmitResponse - Current trial:', currentTrial);
      console.log('SubmitResponse - Processing response:', response);

      const result = handleNSTResponse(response, currentTrial);
      console.log('SubmitResponse - Response result:', result);

      currentTrial.currentDigitIndex++;
      if (currentTrial.currentDigitIndex >= currentTrial.digits.length) {
        req.session.completedTrials.push(result);
        console.log('SubmitResponse - Trial completed:', req.session.completedTrials);
      }

      res.json(result);
    } catch (error) {
      console.error('SubmitResponse - Error:', error);
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
      console.log('GetExperimentState - Session state:', req.session);
      
      if (!req.session) {
        throw new Error('No active session found');
      }

      const state = {
        status: 'active',
        phase: req.session.phase,
        startTime: req.session.startTime,
        currentTrial: req.session.currentTrialIndex,
        currentDigitIndex: req.session.currentDigitIndex
      };
      console.log('GetExperimentState - Sending state:', state);
      res.json(state);
    } catch (error) {
      console.error('GetExperimentState - Error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  getTrialState: (req, res) => {
    try {
      console.log('GetTrialState - Session state:', req.session);
      
      if (!req.session) {
        throw new Error('No active session found');
      }

      const state = {
        current: req.session.trialPhase,
        next: req.session.trialPhase === 'showing_digit' ? 'awaiting_response' : 'showing_digit',
        timestamp: Date.now()
      };
      console.log('GetTrialState - Sending state:', state);
      res.json(state);
    } catch (error) {
      console.error('GetTrialState - Error:', error);
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