const PERFORMANCE_THRESHOLDS = {
  renderTime: {
    warning: 16, // 60fps threshold
    error: 33    // 30fps threshold
  },
  
  responseTime: {
    warning: 100,
    error: 250
  },
  
  memoryUsage: {
    warning: 50 * 1024 * 1024, // 50MB
    error: 100 * 1024 * 1024   // 100MB
  },
  
  testExecution: {
    unit: 50,      // 50ms
    integration: 200,
    e2e: 1000
  }
};

export const checkPerformance = (metric, value) => {
  const threshold = PERFORMANCE_THRESHOLDS[metric];
  
  if (value >= threshold.error) {
    throw new Error(`Performance error: ${metric} exceeded error threshold`);
  }
  
  if (value >= threshold.warning) {
    console.warn(`Performance warning: ${metric} exceeded warning threshold`);
  }
  
  return true;
};
