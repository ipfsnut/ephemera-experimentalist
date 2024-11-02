import React from 'react';
import { useExperiment } from '../../../context/ExperimentContext';
import styles from './EndTrialScreen.module.css';

const EndTrialScreen = () => {
  const { state } = useExperiment();
  
  const handleExport = async () => {
    try {
      const response = await fetch(`/api/experiments/nst/${state.sessionId}/export`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${state.sessionId}`
        }
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
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
    <div className={styles.endTrialScreen}>
      <h2>Session Complete</h2>
      <div className={styles.actionButtons}>
        <button onClick={handleExport} className={styles.exportButton}>
          Export Session Data ({state.sessionId})
        </button>
      </div>
    </div>
  );
};

export default EndTrialScreen;