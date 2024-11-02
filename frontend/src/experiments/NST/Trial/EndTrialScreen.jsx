import React from 'react';
import { useExperiment } from '../../../context/ExperimentContext';

const EndTrialScreen = () => {
  const { state } = useExperiment();
  
  const handleExport = async () => {
    try {
      const response = await experimentApi.exportSession(state.sessionId);
      
      // Create download link for zip file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `nst-session-${state.sessionId}.zip`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="end-trial-screen">
      <h2>Session Complete</h2>
      <div className="action-buttons">
        <button onClick={handleExport}>
          Export Session Data ({state.sessionId})
        </button>
      </div>
    </div>
  );
};

export default EndTrialScreen;