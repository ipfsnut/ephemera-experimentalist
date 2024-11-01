import React, { useEffect } from 'react';
import { useExperiment } from '../../../context/ExperimentContext';

const TrialDisplay = () => {
  const { state, dispatch } = useExperiment();

  const initializeTrial = async () => {
    console.log('Initializing new trial, current state:', {
      currentTrial: state?.currentTrial,
      responseCount: state?.responses?.length,
      sequenceLength: state?.sequence?.length
    });
    
    try {
      const response = await fetch('http://localhost:5069/api/experiments/nst/trials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log('Starting next trial with data:', data);
      dispatch({
        type: 'START_TRIAL',
        payload: data
      });
    } catch (error) {
      console.error('Failed to initialize trial:', error);
    }
  };

  // Initialize first trial
  useEffect(() => {
    if (!state?.sequence) {
      initializeTrial();
    }
  }, []);

  // Handle responses and trial progression
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!state?.currentDigit || !state?.sequence) return;
      
      const key = event.key.toLowerCase();
      const currentNumber = parseInt(state.currentDigit);
      const isOdd = currentNumber % 2 === 1;
      
      if (key === 'f' || key === 'j') {
        const isCorrect = (key === 'f' && isOdd) || (key === 'j' && !isOdd);
        console.log('Processing response:', {
          digit: currentNumber,
          response: key,
          isCorrect,
          currentTrial: state.currentTrial,
          responseCount: state.responses.length,
          sequenceLength: state.sequence.length,
          currentSequence: state.sequence
        });
        
        dispatch({
          type: 'RECORD_RESPONSE',
          payload: {
            digit: currentNumber,
            response: key,
            isCorrect,
            timestamp: Date.now()
          }
        });

        // Only advance trial when we've collected all responses for current sequence
        if (state.responses.length === state.sequence.length - 1) {
          console.log('Trial complete, advancing to next trial:', {
            currentTrial: state.currentTrial,
            totalTrials: state.trials.length
          });
          initializeTrial();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state?.currentDigit, state?.responses?.length, state?.sequence?.length]);

  return (
    <div className="trial-display">
      <div className="current-digit">
        {state?.currentDigit || 'Loading...'}
      </div>
      <div className="trial-info">
        Trial {state?.currentTrial + 1} of {state?.trials?.length}
      </div>
      <div className="key-instructions">
        <p>Press 'F' for odd numbers</p>
        <p>Press 'J' for even numbers</p>
      </div>
    </div>
  );
};

export default TrialDisplay;