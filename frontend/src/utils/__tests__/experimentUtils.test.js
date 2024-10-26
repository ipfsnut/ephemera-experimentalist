import { calculateAccuracy, calculateResponseTime, validateResponse } from '../experimentUtils';

describe('Experiment Utils', () => {
  test('calculates accuracy correctly', () => {
    const results = [
      { response: 'odd', correct: true },
      { response: 'even', correct: false },
      { response: 'odd', correct: true }
    ];
    
    expect(calculateAccuracy(results)).toBe(66.67);
  });

  test('calculates average response time', () => {
    const results = [
      { responseTime: 300 },
      { responseTime: 400 },
      { responseTime: 500 }
    ];
    
    expect(calculateResponseTime(results)).toBe(400);
  });

  test('validates responses', () => {
    expect(validateResponse('odd', 5)).toBe(true);
    expect(validateResponse('even', 4)).toBe(true);
    expect(validateResponse('odd', 2)).toBe(false);
  });
});
