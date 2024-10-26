/**
 * Configuration for the Number Switching Task experiment
 * 
 * EFFORT_LEVELS: Maps effort levels (1-7) to their switch parameters
 * - min: minimum number of switches in the sequence
 * - max: maximum number of switches in the sequence
 * Higher effort levels require more switches between odd/even numbers
 * 
 * KEYS: Response mappings for odd/even number categorization
 * INTER_TRIAL_DELAY: Pause between trials in milliseconds
 * numTrials: Total number of trials in an experiment session
 * effortLevels: Available effort conditions
 * trialsPerEffort: Number of trials per effort level
 */
const experimentConfig = {
    EFFORT_LEVELS: {
      1: { min: 1, max: 2 },   // Lowest cognitive load
      2: { min: 3, max: 4 },
      3: { min: 5, max: 6 },
      4: { min: 7, max: 8 },   // Medium cognitive load
      5: { min: 9, max: 10 },
      6: { min: 11, max: 12 },
      7: { min: 13, max: 14 }, // Highest cognitive load
    },
    KEYS: {
      ODD: 'f',
      EVEN: 'j'
    },
    INTER_TRIAL_DELAY: 1000,
    numTrials: 14,
    effortLevels: ['1', '2', '3', '4', '5', '6', '7'],
    trialsPerEffort: 2,
    isCustom: false
};

module.exports = experimentConfig;