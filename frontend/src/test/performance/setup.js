import { performance, PerformanceObserver } from 'perf_hooks';

const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    if (entry.duration > 100) {
      console.warn(`Slow test detected: ${entry.name} (${entry.duration}ms)`);
    }
  });
});

obs.observe({ entryTypes: ['measure'], buffered: true });

beforeEach(() => {
  performance.mark('test-start');
});

afterEach(() => {
  performance.mark('test-end');
  performance.measure(
    expect.getState().currentTestName,
    'test-start',
    'test-end'
  );
});

global.testPerformance = {
  markStart: (label) => performance.mark(`${label}-start`),
  markEnd: (label) => {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
  }
};
