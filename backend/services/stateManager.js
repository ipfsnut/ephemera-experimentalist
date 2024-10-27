class StateManager {
  constructor() {
    this.sessions = new Map();
    this.sessionTimeouts = new Map();
    this.TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes
  }

  createSession(sessionId, experiment) {
    this.sessions.set(sessionId, { experiment });
    this.resetTimeout(sessionId);
  }

  resetTimeout(sessionId) {
    if (this.sessionTimeouts.has(sessionId)) {
      clearTimeout(this.sessionTimeouts.get(sessionId));
    }
    
    const timeout = setTimeout(() => {
      this.sessions.delete(sessionId);
      this.sessionTimeouts.delete(sessionId);
    }, this.TIMEOUT_DURATION);
    
    this.sessionTimeouts.set(sessionId, timeout);
  }

  getSessionState(sessionId) {
    const session = this.sessions.get(sessionId);
    if (!session) return null;
    this.resetTimeout(sessionId);
    return session;
  }

  async saveCapture(sessionId, imageData, captureData) {
    const session = this.sessions.get(sessionId);
    // Implementation here
    this.resetTimeout(sessionId);
    return { success: true };
  }

  processResponse(sessionId, response) {
    const session = this.sessions.get(sessionId);
    // Implementation here
    this.resetTimeout(sessionId);
    return { success: true };
  }
}

module.exports = new StateManager();
