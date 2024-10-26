import NumberSwitchingTask from '../index';

describe('NumberSwitchingTask', () => {
  const config = {
    EFFORT_LEVELS: {
      1: { min: 2, max: 4 }
    }
  };

  test('generates trials correctly', () => {
    const experiment = new NumberSwitchingTask(config);
    const trials = experiment.generateTrials();
    expect(trials.length).toBeGreaterThan(0);
    expect(trials[0]).toHaveProperty('number');
    expect(trials[0]).toHaveProperty('effortLevel');
  });

  test('processes responses correctly', () => {
    const experiment = new NumberSwitchingTask(config);
    experiment.generateTrials();
    const response = experiment.processResponse('f');
    expect(response).toHaveProperty('digit');
    expect(response).toHaveProperty('response');
    expect(response).toHaveProperty('isCorrect');
  });
});
