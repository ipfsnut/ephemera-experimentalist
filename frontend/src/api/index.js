const API_BASE_URL = 'http://localhost:5069/api';

export const startExperiment = async (experimentType, config) => {
  const response = await fetch(`${API_BASE_URL}/experiments/nst/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ experimentType, config }),
  });
  if (!response.ok) {
    throw new Error('Failed to start experiment');
  }
  return response.json();
};