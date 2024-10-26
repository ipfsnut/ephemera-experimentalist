import { validateDataQuality, checkResponsePatterns, detectAnomalies } from '../dataQuality';

describe('Data Quality Utils', () => {
  test('validates overall data quality', () => {
    const experimentData = {
      responses: ['odd', 'even', 'odd'],
      responseTimes: [400, 450, 425],
      accuracy: [true, true, false]
    };
    
    const quality = validateDataQuality(experimentData);
    expect(quality.isValid).toBe(true);
    expect(quality.score).toBeGreaterThan(0.8);
  });

  test('checks for suspicious response patterns', () => {
    const patterns = checkResponsePatterns([
      'odd', 'odd', 'odd', 'odd', 'odd'
    ]);
    
    expect(patterns.suspicious).toBe(true);
    expect(patterns.reason).toBe('repetitive_pattern');
  });

  test('detects data anomalies', () => {
    const data = {
      responseTimes: [300, 350, 1500, 320],
      accuracy: [1, 1, 0, 1]
    };
    
    const anomalies = detectAnomalies(data);
    expect(anomalies.found).toBe(true);
    expect(anomalies.locations).toContain(2);
  });
});
