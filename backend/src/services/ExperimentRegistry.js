class ExperimentRegistry {
  constructor() {
    this.boundaryContract = {
      allowedMethods: ['listExperiments', 'getExperimentInfo', 'validateCapabilities'],
      responsibilities: 'Experiment discovery and capability detection'
    };
  }

  async listExperiments() {
    return {
      experiments: await this.getRegisteredExperiments(),
      timestamp: Date.now()
    };
  }

  async getExperimentInfo(experimentId) {
    const experiment = await this.findExperiment(experimentId);
    return {
      id: experimentId,
      capabilities: experiment.capabilities,
      metadata: experiment.metadata
    };
  }

  async validateCapabilities(experimentId, requiredCapabilities) {
    const experiment = await this.findExperiment(experimentId);
    return {
      valid: this.checkCapabilities(experiment, requiredCapabilities),
      availableCapabilities: experiment.capabilities
    };
  }
}

module.exports = wrapService(new ExperimentRegistry(), 'ExperimentRegistry');
