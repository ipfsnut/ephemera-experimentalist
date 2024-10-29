const { generateMarkovNumber } = require('../../utils/markovChain');
const experimentConfig = require('../../config');

const generateTrialNumbers = (config) => {
  const trialNumbers = [];
  const effortLevels = config.effortLevels;

  for (let i = 0; i < config.numTrials; i++) {
    const level = effortLevels[i % effortLevels.length];
    trialNumbers.push(generateMarkovNumber(level, config));
  }

  // Fisher-Yates shuffle
  for (let i = trialNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [trialNumbers[i], trialNumbers[j]] = [trialNumbers[j], trialNumbers[i]];
  }

  return trialNumbers;
};

const generateNSTTrials = (numTrials, effortLevel) => {
  const config = {
    ...experimentConfig,
    numTrials,
    effortLevel
  };
  return generateTrialNumbers(config);
};const handleNSTResponse = (response, currentTrial) => {
  const isCorrect = (currentTrial.digit % 2 === 0 && response === 'j') ||
                    (currentTrial.digit % 2 !== 0 && response === 'f');
  
  return {
    digit: currentTrial.digit,
    response: response,
    responseTime: Date.now() - currentTrial.startTime,
    isCorrect: isCorrect
  };
};

const isNSTComplete = (currentTrialIndex, totalTrials) => {
  return currentTrialIndex >= totalTrials - 1;
};

const getNextNSTState = (currentState, action) => {
  switch (currentState) {
    case 'INITIALIZING':
      return 'SHOWING_DIGIT';
    case 'SHOWING_DIGIT':
      return action === 'RESPONSE_RECEIVED' ? 'INTER_TRIAL_DELAY' : currentState;
    case 'INTER_TRIAL_DELAY':
      return 'SHOWING_DIGIT';
    default:
      return currentState;
  }
};

module.exports = {
  generateNSTTrials,
  handleNSTResponse,
  isNSTComplete,
  getNextNSTState
};