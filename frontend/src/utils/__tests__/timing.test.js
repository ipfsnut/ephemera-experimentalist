import { measureResponseTime, validateTiming, checkResponseWindow } from '../timing';

describe('Timing Utils', () => {
  test('measures response times accurately', () => {
    const start = performance.now();
    const responseTime = measureResponseTime(start);
    expect(responseTime).toBeGreaterThan(0);
  });

  test('validates timing constraints', () => {
    const timings = [300, 400, 500];
    expect(validateTiming(timings)).toBe(true);
    expect(validateTiming([50, 60000])).toBe(false);
  });

  test('checks response window validity', () => {
    const validResponse = checkResponseWindow(500, {
      min: 200,
      max: 1000
    });
    expect(validResponse).toBe(true);

    const invalidResponse = checkResponseWindow(100, {
      min: 200,
      max: 1000
    });
    expect(invalidResponse).toBe(false);
  });
});
