class BaseExperiment {
  constructor(config) {
    this.config = config;
    this.state = {
      currentTrial: 0,
      currentDigit: 0,
      responses: []
    };
  }

  generateTrials() {
    throw new Error('generateTrials must be implemented');
  }

  getNextDigit() {
    throw new Error('getNextDigit must be implemented');
  }

  processResponse(response) {
    throw new Error('processResponse must be implemented');
  }

  shouldCaptureImage() {
    throw new Error('shouldCaptureImage must be implemented');
  }
}

module.exports = BaseExperiment;
