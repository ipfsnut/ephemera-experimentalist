import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Number Switching Task</h1>
      <button onClick={() => navigate('/experiments/nst')}>
        Start Experiment
      </button>
    </div>
  );
};

export default Home;