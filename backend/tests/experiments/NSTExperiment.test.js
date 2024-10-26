const NSTExperiment = require('../../experiments/NSTExperiment');

describe('NST Experiment', () => {
  const mockConfig = {
    trialsPerLevel: 3,
    EFFORT_LEVELS: {
      1: { min: 2, max: 4 },
      2: { min: 3, max: 5 },
      3: { min: 4, max: 6 }
    }
  };

  test('generates valid number sequences', () => {
    const experiment = new NSTExperiment(mockConfig);
    const result = experiment.getNextDigit();
    
    expect(result.number).toMatch(/^\d{15}$/);
    expect(result.metadata.trialNumber).toBe(1);
    expect(result.metadata.effortLevel).toBe(1);
  });

  test('increases effort level after specified trials', () => {
    const experiment = new NSTExperiment(mockConfig);
    
    // Run through 3 trials
    experiment.getNextDigit();
    experiment.getNextDigit();
    const result = experiment.getNextDigit();
    
    expect(result.metadata.effortLevel).toBe(2);
  });
});
