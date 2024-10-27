const { experiments, getExperiment } = require('../core/experimentLoader');
const StateManager = require('../services/stateManager');

exports.startExperiment = async (req, res) => {
  try {
    console.log('Starting experiment with config:', req.body);
    const { experimentType, config } = req.body;
    
    // Add default config validation
    const validatedConfig = {
      numTrials: config.numTrials || 14,
      effortLevels: config.effortLevels || ['1', '2', '3', '4', '5', '6', '7'],
      digitsPerTrial: 15
    };

    console.log('Loading experiment class:', experimentType);
    const ExperimentClass = getExperiment(experimentType);
    console.log('Initializing experiment instance');
    const experiment = new ExperimentClass(validatedConfig);
    console.log('Generating trials');
    experiment.generateTrials();

    const sessionId = `session-${Date.now()}`;
    console.log('Creating session:', sessionId);
    StateManager.createSession(sessionId, experiment);
    console.log('Session created successfully');
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
    const trialState = {
      currentTrialIndex: session.experiment.currentTrialIndex,
      currentDigit: session.experiment.state.currentDigit,
      totalTrials: session.experiment.trials.length
    };
    
    return res.json({
      digit: nextDigit,
      trialState,
      captureRequired: session.experiment.shouldCaptureImage()
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