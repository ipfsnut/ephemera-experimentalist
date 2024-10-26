const { generateMarkovNumber } = require('../../utils/markovChain');

describe('Markov Chain Generator', () => {
  const mockConfig = {
    EFFORT_LEVELS: {
      1: { min: 2, max: 4 },
      2: { min: 3, max: 5 },
      3: { min: 4, max: 6 }
    }
  };

  test('generates 15-digit number sequence', () => {
    const result = generateMarkovNumber(1, mockConfig);
    expect(result.number).toMatch(/^\d{15}$/);
  });

  test('respects effort level constraints', () => {
    const result = generateMarkovNumber(1, mockConfig);
    expect(result.metadata.targetSwitches).toBeGreaterThanOrEqual(mockConfig.EFFORT_LEVELS[1].min);
    expect(result.metadata.targetSwitches).toBeLessThanOrEqual(mockConfig.EFFORT_LEVELS[1].max);
  });

  test('generates valid odd/even sequences', () => {
    const result = generateMarkovNumber(1, mockConfig);
    const digits = result.number.split('').map(Number);
    
    // Check that each digit is valid odd or even
    digits.forEach(digit => {
      expect(digit).toBeGreaterThanOrEqual(1);
      expect(digit).toBeLessThanOrEqual(9);
    });
  });
});
