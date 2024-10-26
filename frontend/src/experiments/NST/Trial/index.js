import React, { useEffect } from 'react';
import { useExperiment } from '../../../context/ExperimentContext';
import { useExperimentNavigation } from '../../../hooks/useNavigation';

const ExperimentRunner = () => {
  const { state } = useExperiment();
  const { goToCompletion } = useExperimentNavigation();

  useEffect(() => {
    if (state.isComplete) {
      goToCompletion();
    }
  }, [state.isComplete]);

  return (
    <div className="experiment-container">
      <div className="trial-counter">
        Trial {state.currentTrial}/{state.totalTrials}
      </div>
      <div className="number-display">
        <h1>{state.currentDigit}</h1>
      </div>
      <div className="instruction-text">
        Press 'f' for odd numbers and 'j' for even numbers
      </div>
    </div>
  );
};

export default ExperimentRunner;