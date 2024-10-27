const { experiments, getExperiment } = require('../core/experimentLoader');
const StateManager = require('../services/stateManager');

exports.startExperiment = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { experimentType, config } = req.body;
    console.log('Experiment type:', experimentType);
    const ExperimentClass = getExperiment(experimentType);
    console.log('Got experiment class');
    const experiment = new ExperimentClass(config);
    const sessionId = `session-${Date.now()}`;
    StateManager.createSession(sessionId, experiment);
    return res.json({ sessionId });
  } catch (error) {
    console.error('Start experiment error:', error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getNextDigit = async (req, res) => {
  const { sessionId } = req.params;
  const session = StateManager.sessions.get(sessionId);
  
  if (!session) {
    return res.status(404).json({
      message: 'Session not found'
    });
  }

  try {
    const nextDigit = session.experiment.getNextDigit();
    return res.json({
      digit: nextDigit,
      captureRequired: true
    });
  } catch (error) {
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