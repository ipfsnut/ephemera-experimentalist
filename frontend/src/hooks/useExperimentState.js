import { useCallback } from 'react';
import { useExperiment } from '../context/ExperimentContext';
import { experimentApi } from '../api/experimentApi';

export const useExperimentState = () => {
  const { state, dispatch } = useExperiment();

  const startExperiment = useCallback(async () => {
    const response = await experimentApi.startExperiment('NST', state.config);
    dispatch({ type: 'START_SESSION', payload: response.data.sessionId });
  }, [state.config]);

  const submitTrial = useCallback(async (response, responseTime) => {
    const result = await experimentApi.submitResponse(state.sessionId, {
      response,
      responseTime,
      digit: state.currentTrial
    });
    
    if (result.data.isComplete) {
      dispatch({ type: 'COMPLETE_EXPERIMENT' });
    } else {
      dispatch({ type: 'ADD_RESULT', payload: result.data });
    }
    
    return result.data;
  }, [state.sessionId, state.currentTrial]);

  return { startExperiment, submitTrial };
};
