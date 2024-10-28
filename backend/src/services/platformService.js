const logger = require('../utils/logger');

class PlatformService {
  constructor() {
    this.experiments = new Map();
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
}

module.exports = new PlatformService();
