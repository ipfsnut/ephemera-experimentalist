const NSTExperiment = require('../experiments/NSTExperiment');

const experiments = {
  'NST': NSTExperiment
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
