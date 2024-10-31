const logger = require('../utils/logger');

class PlatformService {
  constructor() {
    this.experiments = new Map([
      ['nst', {
        id: 'nst',
        name: 'Number Switching Task',
        description: 'A cognitive task measuring effort and task-switching ability',
        status: 'active'
      }]
    ]);
    this.settings = {
      allowNewExperiments: true,
      maxConcurrentSessions: 10,
      dataRetentionDays: 30
    };
  }

  async checkHealth() {
    const health = {
      health: 'healthy',
      timestamp: Date.now(),
      services: {
        database: true,
        fileSystem: true,
        experimentRunner: true
      }
    };
    return health;
  }

  async listExperiments() {
    const experimentList = Array.from(this.experiments.values()).map(exp => ({
      id: exp.id,
      name: exp.name,
      description: exp.description,
      status: exp.status
    }));
    return experimentList;
  }

  async getSettings() {
    return this.settings;
  }

  async updateSettings(newSettings) {
    this.settings = {
      ...this.settings,
      ...newSettings
    };
    logger.info('Platform settings updated', this.settings);
    return this.settings;
  }

  async getTotalSessions() {
    // Placeholder for database integration
    return this.experiments.reduce((total, exp) => total + exp.sessions.length, 0);
  }
  
  async createSession(experimentId) {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) {
      throw new Error('Experiment not found');
    }
    return {
      id: Date.now().toString(),
      experimentId,
      status: 'initialized',
      startTime: Date.now()
    };
  }
}

module.exports = new PlatformService();


