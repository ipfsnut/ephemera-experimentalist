const { registerExperiment } = require('../core/experimentLoader');
const NumberSwitchingTask = require('./numberSwitching');

// Register available experiments
registerExperiment('nst', NumberSwitchingTask);

module.exports = {
  // Export experiment-related utilities as needed
  getAvailableExperiments: () => ['nst']
};
