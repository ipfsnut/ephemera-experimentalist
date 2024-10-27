import { useState, useCallback } from 'react';

const useResponseHandler = (digit, onTrialComplete) => {
  const [responseStartTime, setResponseStartTime] = useState(null);

  const handleResponse = useCallback((response) => {
    if (!digit) return;
    
    const responseTime = Date.now() - responseStartTime;
    const isCorrect = (digit % 2 === 0 && response === 'j') || 
                     (digit % 2 !== 0 && response === 'f');
    
    // Log response data
    console.log('Response recorded:', {
      digit,
      response,
      responseTime,
      isCorrect
    });

    // Send to backend
    fetch('/api/experiment/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        digit,
        response,
        responseTime,
        timestamp: Date.now()
      })
    });

    onTrialComplete({
      response,
      responseTime,
      isCorrect,
      timestamp: Date.now()
    });
  }, [digit, responseStartTime, onTrialComplete]);

  const startTrial = useCallback(() => {
    setResponseStartTime(Date.now());
  }, []);

  return { handleResponse, startTrial };
};

export default useResponseHandler;
