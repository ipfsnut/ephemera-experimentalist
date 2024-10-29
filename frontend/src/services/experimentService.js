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
