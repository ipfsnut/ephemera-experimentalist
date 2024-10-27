const { generateSessionId } = require('../utils/sessionGenerator');
const NSTExperiment = require('../experiments/NSTExperiment');
const stateManager = require('../services/stateManager');

exports.startExperiment = async (req, res) => {
  try {
    const { experimentType, config } = req.body;
    console.log('Starting experiment:', { experimentType, config });
    const experiment = new NSTExperiment(config);
    const sessionId = generateSessionId();
    console.log('Created session:', sessionId);
    stateManager.createSession(sessionId, experiment);
    return res.json({ sessionId });
  } catch (error) {
    console.error('Start experiment error:', error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getNextDigit = async (req, res) => {
  const { sessionId } = req.params;
  console.log('Getting next digit for session:', sessionId);
  const session = StateManager.sessions.get(sessionId);
  
  if (!session) {
    console.error('Session not found:', sessionId);
    return res.status(404).json({
      message: 'Session not found'
    });
  }

  try {
    const nextDigit = session.experiment.getNextDigit();
    console.log('Generated digit:', nextDigit);
    const trialState = {
      currentTrialIndex: session.experiment.currentTrialIndex,
      currentDigit: session.experiment.state.currentDigit,
      totalTrials: session.experiment.trials.length
    };
    console.log('Trial state:', trialState);
    return res.json({
      digit: nextDigit,
      trialState,
      captureRequired: session.experiment.shouldCaptureImage()
    });
  } catch (error) {
    console.error('Get next digit error:', error);
    return res.status(500).json({ message: error.message });
  }
};
exports.submitCapture = async (req, res) => {
  const { sessionId } = req.params;
  const { imageData, captureData } = req.body;
  const result = await StateManager.saveCapture(sessionId, imageData, captureData);
  res.json(result);
};

exports.submitResponse = async (req, res) => {
  const { sessionId } = req.params;
  const { response } = req.body;
  const result = StateManager.processResponse(sessionId, response);
  res.json(result);
};

exports.getExperimentState = async (req, res) => {
  const { sessionId } = req.params;
  const state = StateManager.getSessionState(sessionId);
  res.json(state);
};