import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
const API_BASE_URL = 'http://localhost:5069/api';
const PlatformContext = createContext();

export const PlatformProvider = ({ children }) => {
  const [platformState, setPlatformState] = useState({
    status: null,
    availableExperiments: [],
    currentSession: null,
    error: null
  });

  const checkPlatformStatus = useCallback(async () => {
    console.log('Checking platform status');
    const response = await fetch(`${API_BASE_URL}/platform/health`);
    const status = await response.json();
    console.log('Platform status received:', status);
    setPlatformState(prev => ({ ...prev, status }));
    return status;
  }, []);

  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  if (!isLoading) return;
  // existing fetch code
  setIsLoading(false);
}, []);

  const loadExperiments = useCallback(async () => {
    console.log('Fetching experiments from API');
    const response = await fetch(`${API_BASE_URL}/platform/experiments`);
    const experiments = await response.json();
    console.log('Received experiments:', experiments);
    setPlatformState(prev => ({ ...prev, availableExperiments: experiments }));
  }, []);

  const initializeSession = useCallback(async (experimentId) => {
    const response = await fetch(`${API_BASE_URL}/platform/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ experimentId })
    });
    const session = await response.json();
    return session;
  }, []);

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


