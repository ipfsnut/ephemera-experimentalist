import { useCallback, useRef, useEffect, createContext, useContext, useState } from 'react';
import { useExperiment } from '../../../context/ExperimentContext';

const useResponseHandler = (currentDigit) => {
  const { state, dispatch } = useExperiment();
  const prevDigitRef = useRef(currentDigit);

  useEffect(() => {
    if (prevDigitRef.current !== currentDigit) {
      console.log('Digit changed:', currentDigit);
      prevDigitRef.current = currentDigit;
    }
  }, [currentDigit]);

  const handleResponse = useCallback(async (response) => {
    const responseData = {
      digit: currentDigit,
      response,
      timestamp: Date.now()
    };
    console.log('Processing response:', responseData);

    try {
      const result = await fetch(`/api/experiments/nst/response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: state.sessionId,
          ...responseData
        })
      });
      const validatedResponse = await result.json();
      console.log('Validated response:', validatedResponse);
      dispatch({ type: 'RECORD_RESPONSE', payload: validatedResponse });
    } catch (error) {
      console.error('Response submission failed:', error);
    }
  }, [currentDigit, state.sessionId, dispatch]);

  const startTrial = useCallback(() => Date.now(), []);

  return { handleResponse, startTrial };
};

export default useResponseHandler;