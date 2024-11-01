const BaseExperiment = require('../core/baseExperiment');
const { generateMarkovNumber } = require('../utils/markovChain');

class NSTExperiment extends BaseExperiment {
  constructor(config) {
    super();
    this.config = config;
    this.currentEffortLevel = 1;
    this.trialCount = 0;
  }

  getNextDigit() {
    this.trialCount++;
    
    // Generate number sequence using Markov chain
    const result = generateMarkovNumber(this.currentEffortLevel, this.config);
    
    // Adjust effort level based on config rules
    if (this.trialCount % this.config.trialsPerLevel === 0) {
      this.currentEffortLevel = Math.min(7, this.currentEffortLevel + 1);
    }

    return {
      number: result.number,
      metadata: {
        trialNumber: this.trialCount,
        effortLevel: this.currentEffortLevel,
        ...result.metadata
      }
    };
  }
}

module.exports = NSTExperiment;