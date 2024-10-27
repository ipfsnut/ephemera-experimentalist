import React from 'react';
import { useExperiment } from '../context/ExperimentContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { dispatch } = useExperiment();

  const startExperiment = async () => {
    const response = await fetch('/api/experiment/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        experimentType: 'NST',
        config: { totalTrials: 10 }
      })
    });
    const data = await response.json();
    
    dispatch({ type: 'SET_SESSION', payload: data.sessionId });
    navigate('/experiments/nst');
  };

  return (
    <div className="home-container">
      <h1>Number Switching Task</h1>
      <button onClick={startExperiment}>Start Experiment</button>
    </div>
  );
};

export default Home;