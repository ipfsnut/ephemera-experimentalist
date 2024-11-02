import { api } from '../api';

export const experimentService = {
  async getStatus() {
    const response = await fetch('/api/platform/status');
    return response.json();
  },
  
  async getMetrics() {
    const response = await fetch('/api/platform/metrics');
    return response.json();
  },

  async saveTrialData(sessionId, data) {
    const response = await fetch(`/api/data/trials/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

export const getCaptureConfig = async (experimentId) => {
  const response = await api.get(`/api/experiment/${experimentId}/capture-config`);
  return response.data;
};

export const validateCaptureSettings = (config) => {
  const {
    captureInterval,
    qualitySettings,
    storageOptions
  } = config;
  
  return {
    interval: captureInterval || 1000,
    quality: qualitySettings || { format: 'jpeg', compression: 0.8 },
    storage: storageOptions || { type: 'session' }
  };
};