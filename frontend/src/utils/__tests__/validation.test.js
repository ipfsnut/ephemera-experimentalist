import { validateExperimentConfig, validateTrialData, validateSession } from '../validation';

describe('Validation Utils', () => {
  test('validates experiment configuration', () => {
    const validConfig = {
      totalTrials: 10,
      stimulusDuration: 1000
    };
    
    expect(validateExperimentConfig(validConfig)).toBe(true);
    expect(validateExperimentConfig({ totalTrials: -1 })).toBe(false);
  });

  test('validates trial data integrity', () => {
    const trials = [
      { trialNumber: 1, response: 'odd' },
      { trialNumber: 2, response: 'even' }
    ];
    
    expect(validateTrialData(trials)).toBe(true);
    expect(validateTrialData([{ trialNumber: 2 }])).toBe(false);
  });

  test('validates session completeness', () => {
    const session = {
      sessionId: 'test-123',
      completedTrials: 10,
      totalTrials: 10
    };
    
    expect(validateSession(session)).toBe(true);
    expect(validateSession({ sessionId: 'test-123' })).toBe(false);
  });
});
