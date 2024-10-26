import { useState, useCallback } from 'react';

const useResponseHandler = (onTrialComplete) => {
  const [responseStartTime, setResponseStartTime] = useState(null);

  const handleResponse = useCallback((response) => {
    const responseTime = Date.now() - responseStartTime;
    
    onTrialComplete({
      response,
      responseTime,
      timestamp: Date.now()
    });
  }, [responseStartTime, onTrialComplete]);

  const startTrial = useCallback(() => {
    setResponseStartTime(Date.now());
  }, []);

  return { handleResponse, startTrial };
};
