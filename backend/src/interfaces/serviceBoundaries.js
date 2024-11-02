/**
 * @typedef {Object} PlatformServiceBoundary
 * Platform Layer service contract following vision.txt architecture
 */
const PlatformServiceBoundary = {
  initializeSession: 'async (experimentId, config) => SessionState',
  updateSessionState: 'async (sessionId, updates) => SessionState',
  getSessionState: 'async (sessionId) => SessionState',
  checkHealth: 'async () => HealthStatus',
  listExperiments: 'async () => ExperimentInfo[]'
};

/**
 * @typedef {Object} NSTServiceBoundary
 * Experiment Layer service contract for NST implementation
 */
const NSTServiceBoundary = {
  getNextDigit: 'async () => number',
  validateResponse: '(digit, response) => boolean',
  getTrialState: 'async () => TrialState',
  getConfig: 'async () => NSTConfig',
  updateConfig: 'async (config) => NSTConfig'
};
