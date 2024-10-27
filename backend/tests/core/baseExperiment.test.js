const NumberSwitchingTask = require('../../experiments/numberSwitching');
const { generateTrialNumbers } = require('../../utils/markovChain');

describe('NumberSwitchingTask', () => {
  let experiment;
  
  beforeEach(() => {
    experiment = new NumberSwitchingTask({
      numTrials: 2,
      effortLevels: ['1', '2']
    });
    experiment.generateTrials();
  });

  test('generates valid trial sequence', () => {
    expect(experiment.trials).toHaveLength(2);
    expect(experiment.trials[0]).toHaveLength(15);
  });

  test('processes responses correctly', () => {
    const digit = experiment.getNextDigit().digit;
    const response = digit % 2 === 0 ? 'j' : 'f';
    const result = experiment.processResponse(response);
    
    expect(result).toEqual(expect.objectContaining({
      isCorrect: true,
      trial: 0,
      digit: digit,
      response: response
    }));
  });

  test('tracks trial progression', () => {
    for(let i = 0; i < 15; i++) {
      const { digit, trialProgress } = experiment.getNextDigit();
      expect(trialProgress.digitInTrial).toBe(i + 1);
    }
    expect(experiment.currentTrialIndex).toBe(1);
  });
});