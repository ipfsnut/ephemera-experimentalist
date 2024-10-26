import React from 'react';
import { Navigate } from 'react-router-dom';
import { useExperiment } from '../context/ExperimentContext';

export const ExperimentGuard = ({ children }) => {
  const { state } = useExperiment();
  
  if (!state.sessionId) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export const CompletionGuard = ({ children }) => {
  const { state } = useExperiment();
  
  if (!state.isComplete) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};
