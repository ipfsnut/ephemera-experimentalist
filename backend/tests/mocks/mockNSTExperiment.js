const BaseExperiment = require('../../core/baseExperiment');

class MockNSTExperiment extends BaseExperiment {
  generateTrials() {
    return ['12345', '67890'];
  }

  getNextDigit() {
    return '5';
  }

  processResponse(response) {
    return {
      digit: '5',
      response,
      isCorrect: true
    };
  }

  shouldCaptureImage() {
    return true;
  }
}

module.exports = MockNSTExperiment;
