const logger = require('../utils/logger');

class PlatformService {
  constructor(sessionStore, mongoStore) {
    this.sessionStore = sessionStore;
    this.mongoStore = mongoStore;
    this.experiments = new Map([
      ['nst', {
        id: 'nst',
        name: 'Number Switching Task',
        description: 'A cognitive task measuring cognitive effort without difficulty',
        status: 'active'
      }]
    ]);
  }

  async updateSessionState(sessionId, updates) {
    const session = await this.getSessionState(sessionId);
    const updatedState = {
      ...session,
      ...updates,
      lastUpdated: Date.now()
    };

    await this.mongoStore.sessions.updateOne(
      { sessionId },
      { $set: updatedState },
      { upsert: true }
    );

    return updatedState;
  }

  async getSessionState(sessionId) {
    const session = await this.mongoStore.sessions.findOne({ sessionId });
    if (!session) {
      throw new AppError('Session not found', 404);
    }
    return session;
  }

  async initializeSession(experimentId, config) {
    const sessionId = crypto.randomUUID();
    const sessionState = {
      sessionId,
      experimentId,
      config,
      status: 'initialized',
      responses: [],
      captures: [],
      trialState: {
        current: 0,
        total: config.trials
      },
      metadata: {
        startTime: Date.now(),
        lastUpdated: Date.now()
      }
    };

    await this.mongoStore.sessions.insertOne(sessionState);
    return sessionState;
  }

  async aggregateSessionData(sessionId) {
    const session = await this.getSessionState(sessionId);
    return {
      experimentId: session.experimentId,
      responses: session.responses,
      captures: session.captures,
      trialProgress: {
        completed: session.responses.length,
        total: session.trialState.total
      },
      timing: {
        start: session.metadata.startTime,
        lastUpdate: session.metadata.lastUpdated
      }
    };
  }

  // Core Platform Services
  async checkHealth() {
    return {
      health: 'healthy',
      timestamp: Date.now(),
      services: {
        database: true,
        fileSystem: true,
        experimentRunner: true
      }
    };
  }

  // Experiment Registry
  async listExperiments() {
    return Array.from(this.experiments.values());
  }
}

module.exports = PlatformService;
