import { calculateMean, computeStandardDeviation, findOutliers } from '../statistics';

describe('Statistical Analysis Utils', () => {
  test('calculates means correctly', () => {
    const data = [1, 2, 3, 4, 5];
    expect(calculateMean(data)).toBe(3);
  });

  test('computes standard deviation', () => {
    const responseTimes = [300, 350, 400, 450, 500];
    const sd = computeStandardDeviation(responseTimes);
    expect(sd).toBeCloseTo(70.71, 2);
  });

  test('identifies statistical outliers', () => {
    const data = [100, 150, 200, 800, 175];
    const outliers = findOutliers(data);
    expect(outliers).toEqual([800]);
  });

  test('performs trend analysis', () => {
    const timeSeriesData = [
      { trial: 1, value: 500 },
      { trial: 2, value: 450 },
      { trial: 3, value: 400 }
    ];
    
    const trend = analyzeTrend(timeSeriesData);
    expect(trend.direction).toBe('decreasing');
    expect(trend.significance).toBeGreaterThan(0.95);
  });
});
