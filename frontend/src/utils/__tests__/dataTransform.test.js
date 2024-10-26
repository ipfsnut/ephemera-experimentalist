import { formatExperimentData, parseTrialData, aggregateResults } from '../dataTransform';

describe('Data Transformation Utils', () => {
  test('formats experiment data for export', () => {
    const rawData = {
      sessionId: 'test-123',
      results: [
        { trial: 1, response: 'odd', responseTime: 500 }
      ]
    };
    
    const formatted = formatExperimentData(rawData);
    expect(formatted).toMatchObject({
      metadata: { sessionId: 'test-123' },
      trials: expect.any(Array)
    });
  });

  test('parses trial data correctly', () => {
    const trialData = '1,odd,500,true';
    const parsed = parseTrialData(trialData);
    expect(parsed).toEqual({
      trialNumber: 1,
      response: 'odd',
      responseTime: 500,
      correct: true
    });
  });

  test('aggregates results for analysis', () => {
    const results = [
      { responseTime: 300, correct: true },
      { responseTime: 400, correct: false }
    ];
    
    const stats = aggregateResults(results);
    expect(stats.accuracy).toBe(50);
    expect(stats.meanRT).toBe(350);
  });
});
