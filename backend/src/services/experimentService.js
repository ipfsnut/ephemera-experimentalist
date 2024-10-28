const BaseExperiment = require('../../core/baseExperiment');
const logger = require('../utils/logger');

class ExperimentService {
  constructor() {
    this.experiments = new Map();
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

  async validateConfig(experimentId, config) {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) throw new Error('Experiment not found');
    return experiment.validateConfig(config);
  }

  async startExperiment(experimentId, config) {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) throw new Error('Experiment not found');
    return experiment.start(config);
  }

  async pauseExperiment(experimentId) {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) throw new Error('Experiment not found');
    return experiment.pause();
  }

  async resumeExperiment(experimentId) {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) throw new Error('Experiment not found');
    return experiment.resume();
  }

  async abortExperiment(experimentId) {
    const experiment = this.experiments.get(experimentId);
    if (!experiment) throw new Error('Experiment not found');
    return experiment.abort();
  }

  registerExperiment(experiment) {
    if (!(experiment instanceof BaseExperiment)) {
      throw new Error('Invalid experiment instance');
    }
    this.experiments.set(experiment.id, experiment);
  }
}

module.exports = new ExperimentService();