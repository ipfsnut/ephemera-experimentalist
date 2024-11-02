const useResponseHandler = (currentDigit) => {
  const { state, dispatch } = useExperiment();

  const handleResponse = useCallback(async (response, captureData) => {
    const responseData = {
      experimentId: 'nst',
      sessionId: state.sessionId,
      trialNumber: state.currentTrial + 1,
      digit: currentDigit,
      response: response === 'f' ? 'odd' : 'even',
      timestamp: Date.now(),
      captureData,
      metadata: {
        digitIndex: state.currentDigitIndex,
        sequence: state.sequence,
        isCorrect: (response === 'f' && currentDigit % 2 === 1) ||
                  (response === 'j' && currentDigit % 2 === 0)
      }
    };

    try {
      const result = await fetch('/api/experiments/nst/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.sessionId}`
        },
        credentials: 'include',
        body: JSON.stringify(responseData)
      });
      const data = await result.json();
      if (result.ok) {
        dispatch({ type: 'RECORD_RESPONSE', payload: responseData });
        return data;
      }
      throw new Error(data.message || 'Response submission failed');
    } catch (error) {
      console.error('Error submitting response:', error);
      dispatch({ type: 'RECORD_RESPONSE', payload: responseData });
      return responseData;
    }
  }, [currentDigit, state.sessionId, state.currentTrial, state.currentDigitIndex, state.sequence]);

  return { handleResponse };
};
