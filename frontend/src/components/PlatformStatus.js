import React, { useEffect, useState } from 'react';
import { platformService } from '../services/platformService';

export const PlatformStatus = () => {
  const [status, setStatus] = useState(null);
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const statusData = await platformService.getStatus();
      const metricsData = await platformService.getMetrics();
      setStatus(statusData);
      setMetrics(metricsData);
    };
    loadData();
  }, []);

  return (
    <div>
      <h2>Platform Status</h2>
      {status && (
        <div>
          <h3>Status: {status.status}</h3>
          <p>Last Updated: {new Date(status.timestamp).toLocaleString()}</p>
        </div>
      )}
      {metrics && (
        <div>
          <h3>Metrics</h3>
          <p>Active Experiments: {metrics.activeExperiments}</p>
          <p>Total Sessions: {metrics.totalSessions}</p>
        </div>
      )}
    </div>
  );
};
