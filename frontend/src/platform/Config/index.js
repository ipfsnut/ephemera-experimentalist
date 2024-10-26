import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useExperiment } from '../../context/ExperimentContext';

const Config = () => {
  const navigate = useNavigate();
  const { dispatch } = useExperiment();

  const defaultConfig = {
    trialsPerLevel: 3,
    EFFORT_LEVELS: {
      1: { min: 2, max: 4 },
      2: { min: 3, max: 5 },
      3: { min: 4, max: 6 },
      4: { min: 5, max: 7 },
      5: { min: 6, max: 8 },
      6: { min: 7, max: 9 },
      7: { min: 8, max: 10 }
    }
  };

  const handleStartExperiment = () => {
    dispatch({ type: 'SET_CONFIG', payload: defaultConfig });
    navigate('/experiment');
  };

  return (
    <div className="config-container">
      <h2>Experiment Configuration</h2>
      <div className="config-section">
        <h3>Default Settings</h3>
        <pre>{JSON.stringify(defaultConfig, null, 2)}</pre>
        <button onClick={handleStartExperiment}>
          Start Experiment
        </button>
      </div>
    </div>
  );
};

export default Config;
