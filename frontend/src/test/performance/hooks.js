import { useEffect, useRef } from 'react';
import { checkPerformance } from './thresholds';

export const useRenderPerformance = (componentName) => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current++;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    checkPerformance('renderTime', renderTime);
    
    return () => {
      startTime.current = performance.now();
    };
  });

  return renderCount.current;
};
