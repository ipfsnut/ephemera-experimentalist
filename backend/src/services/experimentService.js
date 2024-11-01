const logger = require('../utils/logger');

class ExperimentService {
  constructor() {
    this.experiments = new Map();
    this.activeSessions = new Map();
  }

  async getAvailableExperiments() {
    return Array.from(this.experiments.values()).map(exp => ({
      id: exp.id,
      name: exp.name,
      description: exp.description,
      config: exp.config
    }));
  }

  async getExperimentInfo(experimentId) {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) throw new Error('Experiment not found');
    return {
      id: experiment.id,
      name: experiment.name,
      description: experiment.description,
      type: experiment.type
    };
  }

  async getConfig(experimentId) {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) throw new Error('Experiment not found');
    return experiment.config;
  }

  async updateConfig(experimentId, newConfig) {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) throw new Error('Experiment not found');
    experiment.config = { ...experiment.config, ...newConfig };
    return experiment.config;
  }

  async startExperiment(experimentId, sessionId, config) {
    logger.info('Starting experiment:', { experimentId, sessionId });
    const session = {
      id: sessionId,
      experimentId,
      state: 'RUNNING',
      startTime: Date.now(),
      config,
      trials: [],
      currentTrialIndex: 0,
      responses: []
    };
    this.activeSessions.set(sessionId, session);
    return session;
  }

  async getSessionState(sessionId) {
    const session = this.activeSessions.get(sessionId);
    if (!session) throw new Error('Session not found');
    return session.state;
  }

  async updateSessionState(sessionId, newState) {
    const session = this.activeSessions.get(sessionId);
    if (!session) throw new Error('Session not found');
    session.state = newState;
    return session.state;
  }

  async recordResponse(sessionId, responseData) {
    const session = this.activeSessions.get(sessionId);
    if (!session) throw new Error('Session not found');
    session.responses.push(responseData);
    logger.info('Response recorded:', { sessionId, response: responseData });
    return responseData;
  }

  async getCurrentTrial(sessionId) {
    const session = this.activeSessions.get(sessionId);
    if (!session) throw new Error('Session not found');
    return session.trials[session.currentTrialIndex];
  }

  async updateTrialIndex(sessionId, newIndex) {
    const session = this.activeSessions.get(sessionId);
    if (!session) throw new Error('Session not found');
    session.currentTrialIndex = newIndex;
    return session.currentTrialIndex;
  }

  registerExperiment(experiment) {
    this.experiments.set(experiment.id, experiment);
  }
}

module.exports = new ExperimentService();