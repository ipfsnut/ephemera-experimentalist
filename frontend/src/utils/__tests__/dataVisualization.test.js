import { createResponseTimePlot, generateAccuracyGraph, plotLearningCurve } from '../dataVisualization';

describe('Data Visualization Utils', () => {
  test('creates response time plots', () => {
    const data = [
      { trial: 1, rt: 500 },
      { trial: 2, rt: 450 },
      { trial: 3, rt: 400 }
    ];
    
    const plot = createResponseTimePlot(data);
    expect(plot.type).toBe('line');
    expect(plot.data).toHaveLength(3);
    expect(plot.labels).toBeDefined();
  });

  test('generates accuracy graphs', () => {
    const trials = [
      { correct: true },
      { correct: false },
      { correct: true }
    ];
    
    const graph = generateAccuracyGraph(trials);
    expect(graph.accuracy).toBe(66.67);
    expect(graph.dataPoints).toHaveLength(3);
  });

  test('plots learning curves', () => {
    const performanceData = {
      trials: [1, 2, 3],
      accuracy: [0.6, 0.7, 0.8],
      rt: [500, 450, 400]
    };
    
    const curve = plotLearningCurve(performanceData);
    expect(curve.trend).toBe('improving');
    expect(curve.slope).toBeGreaterThan(0);
  });
});
