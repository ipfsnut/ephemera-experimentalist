const NumberSwitchingTask = require('../experiments/numberSwitching');

const experiments = {
  'NST': NumberSwitchingTask
};

const getExperiment = (type) => {
  if (!type) {
    throw new Error('Experiment type is required');
  }
  const ExperimentClass = experiments[type];
  if (!ExperimentClass) {
    throw new Error(`Experiment ${type} not found`);
  }
  return ExperimentClass;
};

module.exports = { experiments, getExperiment };
