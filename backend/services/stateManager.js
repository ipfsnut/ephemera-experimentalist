const sessions = new Map();

const createSession = (sessionId, experiment) => {
  sessions.set(sessionId, {
    experiment,
    state: 'INITIALIZING'
  });
};

const getSessionState = (sessionId) => {
  return sessions.get(sessionId);
};

const saveCapture = async (sessionId, imageData, captureData) => {
  const session = sessions.get(sessionId);
  // Implementation here
  return { success: true };
};

const processResponse = (sessionId, response) => {
  const session = sessions.get(sessionId);
  // Implementation here
  return { success: true };
};

module.exports = {
  sessions,
  createSession,
  getSessionState,
  saveCapture,
  processResponse
};
