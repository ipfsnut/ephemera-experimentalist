const BaseExperiment = require('../../core/baseExperiment');
const { generateMarkovNumber } = require('../../utils/markovChain');

class NumberSwitchingTask extends BaseExperiment {
  constructor(config) {
    super({
      ...config,
      EFFORT_LEVELS: {
        1: { min: 1, max: 2 },
        2: { min: 3, max: 4 },
        3: { min: 5, max: 6 },
        4: { min: 7, max: 8 },
        5: { min: 9, max: 10 },
        6: { min: 11, max: 12 },
        7: { min: 13, max: 14 }
      }
    });  
  }

  generateTrials() {
    const trials = [];
    for (let i = 0; i < this.config.numTrials; i++) {
      const level = this.config.effortLevels[i % this.config.effortLevels.length];
      const trial = generateMarkovNumber(level, this.config);
      trials.push(trial);
    }
    
    // Fisher-Yates shuffle
    for (let i = trials.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [trials[i], trials[j]] = [trials[j], trials[i]];
    }
    
    this.trials = trials;
    return trials;
  }
  getNextDigit() {
    if (this.currentTrialIndex >= this.trials.length) {
      throw new Error('No more trials available');
    }
    
    const currentTrial = this.trials[this.currentTrialIndex];
    const digit = parseInt(currentTrial[this.state.currentDigit]);
    
    // Track progression
    this.state.currentDigit++;
    if (this.state.currentDigit >= 15) {
      this.state.currentDigit = 0;
      this.currentTrialIndex++;
    }
    
    return {
      digit,
      trialIndex: this.currentTrialIndex,
      digitIndex: this.state.currentDigit - 1
    };
  }

  processResponse(response) {
    const currentTrial = this.trials[this.currentTrialIndex];
    const currentDigit = parseInt(currentTrial[this.state.currentDigit - 1]);
    
    const isCorrect = (currentDigit % 2 === 0 && response === 'j') || 
                     (currentDigit % 2 !== 0 && response === 'f');
    
    this.state.responses.push({
      trial: this.currentTrialIndex,
      digit: currentDigit,
      response,
      isCorrect,
      timestamp: Date.now()
    });

    return {
      isCorrect,
      trialComplete: this.state.currentDigit === 0
    };
  }

  shouldCaptureImage() {
    return this.currentTrialIndex % 3 === 0;
  }
}
module.exports = NumberSwitchingTask;