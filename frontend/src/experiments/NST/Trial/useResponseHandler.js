import { useCallback } from 'react';
import { useExperiment } from '../../../context/ExperimentContext';

const useResponseHandler = (currentDigit) => {
  const { state, dispatch } = useExperiment();
  
  const handleResponse = useCallback(async (response) => {
    const responseData = {
      digit: currentDigit,
      response,
      timestamp: Date.now()
    };

    try {
      const result = await fetch(`/api/nst/response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: state.sessionId,
          ...responseData
        })
      });
      
      const validatedResponse = await result.json();
      dispatch({ type: 'RECORD_RESPONSE', payload: validatedResponse });
      
    } catch (error) {
      console.error('Response submission failed:', error);
    }
  }, [currentDigit, state.sessionId]);

  const startTrial = useCallback(() => {
    // Reset trial state if needed
    return Date.now();
  }, []);

  return { handleResponse, startTrial };
};

export default useResponseHandler;
