import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { PerformanceMonitor } from '../utils/performance';
import './Layout.css';

const Layout = ({ children }) => {
  React.useEffect(() => {
    const perfCheck = setInterval(() => {
      const fps = PerformanceMonitor.getFPS();
      const memory = PerformanceMonitor.trackMemory();
      if (fps < 20) { // Adjusted threshold
        console.warn('Performance degradation detected', { fps, memory });
      }
    }, 10000); // Increased interval

    return () => clearInterval(perfCheck);
  }, []);

  return (
    <ErrorBoundary>
      <main className="layout">
        {children}
      </main>
    </ErrorBoundary>
  );
};

export default Layout;