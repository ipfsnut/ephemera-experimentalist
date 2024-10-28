import axios from 'axios';

const API_URL = 'http://localhost:3000/api/platform';

export const platformService = {
  async getStatus() {
    const response = await axios.get(`${API_URL}/status`);
    return response.data;
  },

  async getMetrics() {
    const response = await axios.get(`${API_URL}/metrics`);
    return response.data;
  },

  async getExperiments() {
    const response = await axios.get(`${API_URL}/experiments`);
    return response.data;
  },

  async getSettings() {
    const response = await axios.get(`${API_URL}/settings`);
    return response.data;
  },

  async updateSettings(settings) {
    const response = await axios.put(`${API_URL}/settings`, settings);
    return response.data;
  }
};
