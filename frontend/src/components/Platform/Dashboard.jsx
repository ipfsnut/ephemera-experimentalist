import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlatform } from '../../context/PlatformContext';

const Dashboard = () => {
  const {
    status,
    availableExperiments,
    error,
    checkPlatformStatus,
    loadExperiments,
    initializeSession
  } = usePlatform();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      await checkPlatformStatus();
      await loadExperiments();
    };
    loadData();
  }, []);

  useEffect(() => {
    if (availableExperiments.length > 0) {
      console.log('Available experiments detail:', {
        experiment: availableExperiments[0],
        id: availableExperiments[0].id,
        name: availableExperiments[0].name,
        description: availableExperiments[0].description,
        status: availableExperiments[0].status
      });
    }
  }, [availableExperiments]);

  const handleExperimentSelect = async (experimentId) => {
    const session = await initializeSession(experimentId);
    if (session) {
      navigate(`/platform/experiments/${experimentId}`, { state: { session } });
    }
  };

  return (
    <div className="platform-dashboard">
      <header>
        <h1>Ephemera Platform</h1>
        <div className="platform-status">
          Status: {status?.health}
          {error && <div className="error-message">{error}</div>}
        </div>
      </header>
      <main>
        <section className="available-experiments">
          <h2>Available Experiments</h2>
          {availableExperiments.map(exp => (
            <div
              key={exp.id}
              className="experiment-card"
              onClick={() => handleExperimentSelect(exp.id)}
            >
              <h3>{exp.name}</h3>
              <p>{exp.description}</p>
              <button className="start-experiment">
                Start Experiment
              </button>
              <span className="status">{exp.status}</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;