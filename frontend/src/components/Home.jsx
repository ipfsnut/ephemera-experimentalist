import React, { useState } from 'react';
import { useExperiment } from '../context/ExperimentContext';
import { useNavigate } from 'react-router-dom';
import TrialDisplay from '../experiments/NST/Trial/TrialDisplay';
import useTrialCompletion from '../experiments/NST/Trial/useTrialCompletion';


const Home = () => {
  const navigate = useNavigate();
  const { dispatch } = useExperiment();
  const { handleTrialComplete } = useTrialCompletion();
  const [experimentState, setExperimentState] = useState({
    currentDigit: null,
    currentTrial: 0,
    totalTrials: 0
  });

  const startExperiment = async () => {
    const response = await fetch('/api/experiments/nst/config', {
      method: 'GET'
    });
    
    const config = await response.json();
    console.log('API Response:', config);

    // Start trials after getting config
    const trialResponse = await fetch('/api/experiments/nst/trials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const experimentData = await trialResponse.json();
    setCurrentDigit(experimentData.digit);

    const handleTrialComplete = async (responseData) => {
    const response = await fetch('/api/experiments/nst/results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trial: currentTrial,
        response: responseData
      })
    });
    
    const nextTrial = await response.json();
    setCurrentDigit(nextTrial.digit);
    setCurrentTrial(prev => prev + 1);
};  };

  return (
    <div>
      <button onClick={startExperiment}>Start Experiment</button>
      {experimentState.currentDigit && (
        <TrialDisplay 
          currentDigit={experimentState.currentDigit}
          currentTrial={experimentState.currentTrial}
          totalTrials={experimentState.totalTrials}
          onTrialComplete={handleTrialComplete}
        />
      )}
    </div>
  );
};

export default Home;


