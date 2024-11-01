import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { PerformanceMonitor } from '../utils/performance';
import './Layout.css';

const Layout = ({ children }) => {
  React.useEffect(() => {
    const perfCheck = setInterval(() => {
      const fps = PerformanceMonitor.getFPS();
      const memory = PerformanceMonitor.trackMemory();
      if (fps < 30) {
        console.warn('Performance degradation detected', { fps, memory });
      }
    }, 5000);

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
