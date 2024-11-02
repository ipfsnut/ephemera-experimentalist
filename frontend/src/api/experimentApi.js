import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5069/api/experiments/nst'
});

exportSession: (sessionId) => {
  return api.get(`/experiment/${sessionId}/export`, {
    responseType: 'blob'  // Important for handling zip file response
  });
}
export const experimentApi = {
  startExperiment: () => {
    return api.post('/trials');
  },
  getNextDigit: (trialIndex, digitIndex) => {
    return api.get('/next-digit', {
      params: { trialIndex, digitIndex }
    });
  },

  submitResponse: (response) => {
    return api.post('/response', response);
  },

  submitCapture: (imageData, captureData) => {
    return api.post('/capture', {
      imageData,
      captureData
    });
  }
};