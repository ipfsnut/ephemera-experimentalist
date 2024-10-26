import React, { useEffect } from 'react';
import useTrialTransition from './useTrialTransition';
import useKeyboardHandler from './useKeyboardHandler';
import useResponseHandler from './useResponseHandler';

const TrialDisplay = ({ currentDigit, currentTrial, totalTrials, onTrialComplete }) => {
  const { isTransitioning, displayDigit } = useTrialTransition(currentDigit);
  const { handleResponse, startTrial } = useResponseHandler(onTrialComplete);
  
  useKeyboardHandler(handleResponse, isTransitioning);

  useEffect(() => {
    if (!isTransitioning) {
      startTrial();
    }
  }, [isTransitioning]);

  return (
    <div className="trial-display">
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