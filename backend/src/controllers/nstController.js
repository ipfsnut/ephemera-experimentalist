const platformService = require('../services/experimentService');
const experimentConfig = require('../../config');
const { generateMarkovNumber } = require('../../utils/markovChain');



const createTrial = async (req, res) => {
  try {
    const sessionId = Date.now().toString();
    const session = await platformService.startExperiment('nst', sessionId, {
      effortLevel: experimentConfig.EFFORT_LEVELS[1]
    });

    // Use the proper Markov chain generator
    const { number } = generateMarkovNumber(1, experimentConfig);
    const initialTrial = {
      currentDigit: number[0], // Take first digit from generated sequence
      trials: generateTrialSequence(experimentConfig.numTrials),
      sessionId: session.id,
      sequence: number // Store full sequence for progression
    };

    res.json(initialTrial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to generate trial sequence using Markov chains
const generateTrialSequence = (numTrials) => {
    return Array(numTrials).fill().map(() => ({
      number: generateMarkovNumber(1, experimentConfig).number,
      currentIndex: 0
    }));
};
const getNextDigit = async (req, res) => {
  const { trialIndex, digitIndex } = req.query;
  try {
      const digit = await platformService.getNextDigit(trialIndex, digitIndex);
      res.json(digit);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const submitResponse = async (req, res) => {
  const { experimentId, digit, response, timestamp } = req.body;
  try {
      const result = await platformService.recordResponse(experimentId, { digit, response, timestamp });
      res.json(result);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getProgress = async (req, res) => {
  const { experimentId } = req.params;
  try {
      const progress = await platformService.getProgress(experimentId);
      res.json(progress);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const submitCapture = async (req, res) => {
  const { experimentId, captureData } = req.body;
  try {
      const result = await platformService.recordCapture(experimentId, captureData);
      res.json(result);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getCaptureConfig = async (req, res) => {
  res.json({ enabled: true, frequency: 'per_trial' });
};

const getExperimentState = async (req, res) => {
  const { experimentId } = req.params;
  try {
      const state = await platformService.getSessionState(experimentId);
      res.json({ state });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getTrialState = async (req, res) => {
  const { experimentId } = req.params;
  try {
      const trial = await platformService.getCurrentTrial(experimentId);
      res.json(trial);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getNSTConfig = async (req, res) => {
  res.json(experimentConfig);
};

const updateNSTConfig = async (req, res) => {
  const newConfig = req.body;
  try {
      const updatedConfig = await platformService.updateConfig('nst', newConfig);
      res.json(updatedConfig);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTrial,
  getNextDigit,
  submitResponse,
  getProgress,
  submitCapture,
  getCaptureConfig,
  getExperimentState,
  getTrialState,
  getNSTConfig,
  updateNSTConfig
};