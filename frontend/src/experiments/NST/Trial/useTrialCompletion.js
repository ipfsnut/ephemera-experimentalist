import { useCallback } from 'react';
import { useExperiment } from '../../../context/ExperimentContext';

const useTrialCompletion = () => {
  const { state, dispatch } = useExperiment();

  const handleTrialComplete = useCallback(async (trialData) => {
    const isLastTrial = state.currentTrial === state.totalTrials;
    
    dispatch({ 
      type: 'ADD_RESULT', 
      payload: {
        trialNumber: state.currentTrial,
        ...trialData
      }
    });

    if (isLastTrial) {
      dispatch({ type: 'COMPLETE_EXPERIMENT' });
    }
  }, [state.currentTrial, state.totalTrials]);

  return { handleTrialComplete };
};
