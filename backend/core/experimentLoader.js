const NSTExperiment = require('../experiments/NSTExperiment');

const experiments = {
  NST: NSTExperiment
};

const getExperiment = (experimentType) => {
  if (!experimentType) {
    throw new Error('Experiment type is required');
  }

  const ExperimentClass = experiments[experimentType];
  if (!ExperimentClass) {
    throw new Error(`Experiment ${experimentType} not found`);
  }

  return ExperimentClass;
};

module.exports = {
  experiments,
  getExperiment
};
