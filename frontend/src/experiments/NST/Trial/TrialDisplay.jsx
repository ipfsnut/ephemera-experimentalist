import React, { useEffect } from 'react';
import { useExperiment } from '../../../context/ExperimentContext';
import useTrialTransition from './useTrialTransition';
import useKeyboardHandler from './useKeyboardHandler';
import useResponseHandler from './useResponseHandler';
import useFocusManagement from './useFocusManagement';

const TrialDisplay = () => {


  const { state, getNextDigit, dispatch, saveTrialData } = useExperiment();
  const { currentTrial, totalTrials, trialData, isSaving } = state;
  
  const { isTransitioning, displayDigit } = useTrialTransition(trialData?.digit);
  const { handleResponse, startTrial } = useResponseHandler(trialData?.digit);
  const inputRef = useFocusManagement(isTransitioning);
  

  const handleTrialResponse = async (response) => {
    const trialResponse = await handleResponse(response);
    await saveTrialData({
      trial: currentTrial,
      digit: displayDigit,
      response,
      ...trialResponse
    });
    
    if (currentTrial >= totalTrials) {
      dispatch({ type: 'COMPLETE_EXPERIMENT' });
    } else {
      getNextDigit();
    }
  };
  
  useKeyboardHandler(handleTrialResponse, isTransitioning || isSaving);

  useEffect(() => {
    if (!isTransitioning && !trialData) {










      const trialStartTime = startTrial();
      dispatch({ 
        type: 'UPDATE_TRIAL_METRICS', 
        payload: { startTime: trialStartTime } 
      });
    }
  }, [isTransitioning]);


  if (state.isComplete) {
    return <div>Experiment Complete!</div>;
  }

  return (
    <div className="trial-display" ref={inputRef}>
      <div className="trial-counter">
        Trial {currentTrial}/{totalTrials}
      </div>
      
      <div className={`number-display ${isTransitioning ? 'transitioning' : ''}`}>
        <h1>{displayDigit}</h1>
      </div>
      
      <div className="instruction-text">
        Press 'f' for odd numbers and 'j' for even numbers
      </div>
    </div>
  );
};

export default TrialDisplay;