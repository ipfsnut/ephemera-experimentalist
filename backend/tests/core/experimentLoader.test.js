const { getExperiment } = require('../../core/experimentLoader');
const NSTExperiment = require('../../experiments/NSTExperiment');

describe('Experiment Loader', () => {
  test('loads NST experiment type correctly', () => {
    const ExperimentClass = getExperiment('NST');
    expect(ExperimentClass).toBeDefined();
    expect(ExperimentClass).toBe(NSTExperiment);
  });

  test('throws error for unknown experiment type', () => {
    expect(() => {
      getExperiment('UNKNOWN_TYPE');
    }).toThrow('Experiment UNKNOWN_TYPE not found');
  });

  test('throws error for undefined experiment type', () => {
    expect(() => {
      getExperiment();
    }).toThrow('Experiment type is required');
  });
});
