export const PerformanceMonitor = {
  startTrial: () => performance.now(),
  
  endTrial: startTime => ({
    responseTime: performance.now() - startTime,
    timestamp: Date.now()
  }),

  trackMemory: () => ({
    jsHeapSize: performance.memory?.usedJSHeapSize,
    totalHeapSize: performance.memory?.totalJSHeapSize
  }),

  getFPS: (() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    return () => {
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime > 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
        return fps;
      }
      return null;
    };
  })()
};
