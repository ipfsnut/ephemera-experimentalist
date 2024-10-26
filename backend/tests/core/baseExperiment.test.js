const BaseExperiment = require('../../core/baseExperiment');
const experimentLoader = require('../../core/experimentLoader');

describe('Base Experiment', () => {
  test('requires implementation of core methods', () => {
    const experiment = new BaseExperiment({});
    expect(() => experiment.generateTrials()).toThrow();
    expect(() => experiment.getNextDigit()).toThrow();
    expect(() => experiment.processResponse()).toThrow();
  });
});
