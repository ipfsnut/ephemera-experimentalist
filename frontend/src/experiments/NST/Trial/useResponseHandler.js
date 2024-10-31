import { useCallback, useRef, useEffect } from 'react';
import { useExperiment } from '../../../context/ExperimentContext';

const useResponseHandler = (currentDigit) => {
  const { state, dispatch } = useExperiment();
  const prevDigitRef = useRef(currentDigit);

  const handleResponse = useCallback(async (response) => {
    const responseData = {
      digit: currentDigit,
      response,
      timestamp: Date.now()
    };

    try {
      const result = await fetch(`/api/experiments/nst/response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experimentId: 'nst',
          sessionId: state.sessionId,
          ...responseData
        })
      });
      
      const validatedResponse = await result.json();
      dispatch({ type: 'RECORD_RESPONSE', payload: validatedResponse });
      
      return validatedResponse;
    } catch (error) {
      console.error('Response processing failed:', error);
      throw error;
    }
  }, [currentDigit, state.sessionId, dispatch]);

  return { handleResponse };
};

export default useResponseHandler;