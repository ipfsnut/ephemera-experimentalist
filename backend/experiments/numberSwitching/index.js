const BaseExperiment = require('../../core/baseExperiment');
const { generateTrialNumbers } = require('./markovChain');

class NumberSwitchingTask extends BaseExperiment {
  constructor(config) {
    super(config);
    this.trials = [];
    this.digitQueue = [];
  }

  generateTrials() {
    this.trials = generateTrialNumbers(this.config);
    return this.trials;
  }

  getNextDigit() {
    if (this.digitQueue.length === 0) {
      if (this.state.currentTrial >= this.trials.length) {
        return null;
      }
      this.digitQueue = this.trials[this.state.currentTrial].number.split('');
    }
    this.state.currentDigit++;
    return this.digitQueue.shift();
  }

  processResponse(response) {
    const currentDigit = this.trials[this.state.currentTrial].number[this.state.currentDigit - 1];
    const isCorrect = (currentDigit % 2 === 0 && response === 'j') || 
                     (currentDigit % 2 !== 0 && response === 'f');
    
    return { digit: currentDigit, response, isCorrect };
  }

  shouldCaptureImage() {
    // Implement image capture trigger logic
    return this.state.currentDigit % 5 === 0;
  }
}

module.exports = NumberSwitchingTask;
