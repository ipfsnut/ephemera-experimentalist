import React from 'react';
import { useExperiment } from '../../../context/ExperimentContext';
import { useExperimentNavigation } from '../../../hooks/useNavigation';
import { experimentApi } from '../../../api/experimentApi';
import './Completion.css';

const CompletionScreen = () => {
  const { state, dispatch } = useExperiment();
  const { restartExperiment } = useExperimentNavigation();

  const handleDownload = async () => {
    const blob = await experimentApi.downloadResults(state.sessionId);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `experiment-results-${state.sessionId}.zip`;
    a.click();
    
    // Clean up and reset
    window.URL.revokeObjectURL(url);
    dispatch({ type: 'RESET_STATE' });
    restartExperiment();
  };

  return (
    <div className="completion-container">
      <h1>Experiment Complete</h1>
      <div className="stats">
        <p>Total Trials: {state.totalTrials}</p>
        <p>Accuracy: {state.accuracy}%</p>
        <p>Average Response Time: {state.averageRT}ms</p>
      </div>
      <button onClick={handleDownload}>
        Download Results
      </button>
    </div>
  );
};

export default CompletionScreen;