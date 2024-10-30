import React, { createContext, useContext, useState, useCallback } from 'react';

const PlatformContext = createContext();

export const PlatformProvider = ({ children }) => {
  const [platformState, setPlatformState] = useState({
    status: null,
    availableExperiments: [],
    currentSession: null,
    error: null
  });

  const checkPlatformStatus = useCallback(async () => {
    const response = await fetch('/api/platform/health');
    const status = await response.json();
    setPlatformState(prev => ({ ...prev, status }));
    return status;
  }, []);

  const loadExperiments = useCallback(async () => {
    const response = await fetch('/api/platform/experiments');
    const experiments = await response.json();
    setPlatformState(prev => ({ ...prev, availableExperiments: experiments }));
  }, []);

  const initializeSession = useCallback(async (experimentId) => {
    const healthCheck = await checkPlatformStatus();
    if (healthCheck.health !== 'healthy') {
      setPlatformState(prev => ({ ...prev, error: 'Platform not ready' }));
      return null;
    }

    const response = await fetch('/api/platform/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ experimentId })
    });
    const session = await response.json();
    setPlatformState(prev => ({ 
      ...prev, 
      currentSession: session,
      error: null 
    }));
    return session;
  }, [checkPlatformStatus]);

  const value = {
    ...platformState,
    checkPlatformStatus,
    loadExperiments,
    initializeSession
  };

  return (
    <PlatformContext.Provider value={value}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};