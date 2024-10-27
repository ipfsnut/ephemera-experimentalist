const NSTExperiment = require('../../experiments/NSTExperiment');

describe('NSTExperiment', () => {
  const testConfig = {
    trialsPerLevel: 2,
    EFFORT_LEVELS: {
      1: { min: 1, max: 2 },
      2: { min: 3, max: 4 }
    }
  };
  
  let experiment;
  
  beforeEach(() => {
    experiment = new NSTExperiment(testConfig);
  });

  test('processes responses correctly', () => {
    const response = { 
      isCorrect: false,
      nextTrial: 1
    };
    expect(experiment.processResponse('odd')).toEqual(response);
  });
});