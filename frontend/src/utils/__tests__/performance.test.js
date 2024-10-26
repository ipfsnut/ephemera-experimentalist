import { measurePerformance, trackMemory, calculateFPS } from '../performance';

describe('Performance Utils', () => {
  test('measures component render performance', () => {
    const measurement = measurePerformance('render');
    expect(measurement.duration).toBeDefined();
    expect(measurement.timestamp).toBeDefined();
  });

  test('tracks memory usage', () => {
    const memoryStats = trackMemory();
    expect(memoryStats.heapSize).toBeDefined();
    expect(memoryStats.heapLimit).toBeDefined();
  });

  test('calculates frames per second', () => {
    const fps = calculateFPS();
    expect(fps).toBeGreaterThan(0);
    expect(fps).toBeLessThan(144);
  });
});
