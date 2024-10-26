const generateTrialData = (count = 10) => {
  return Array(count).fill().map((_, index) => ({
    trialNumber: index + 1,
    digit: Math.floor(Math.random() * 9) + 1,
    responseTime: Math.floor(Math.random() * 800) + 200,
    response: Math.random() > 0.5 ? 'odd' : 'even'
  }));
};

const generateExperimentState = (overrides = {}) => ({
  sessionId: 'test-123',
  currentTrial: 1,
  totalTrials: 10,
  currentDigit: '5',
  results: [],
  isComplete: false,
  ...overrides
});

export { generateTrialData, generateExperimentState };
