const experimentService = require('../src/services/experimentService');
const BaseExperiment = require('../../core/baseExperiment');

describe('Experiment Service', () => {
  describe('Experiment Registration', () => {
    test('registers and retrieves experiments', async () => {
      const mockExperiment = new BaseExperiment({
        id: 'test-exp',
        name: 'Test Experiment',
        description: 'Test experiment description'
      });
      
      experimentService.registerExperiment(mockExperiment);
      const experiments = await experimentService.getAvailableExperiments();
      
      expect(experiments).toContainEqual(expect.objectContaining({
        id: 'test-exp',
        name: 'Test Experiment',
        description: 'Test experiment description'
      }));
    });
  });

  describe('Experiment Control', () => {
    test('starts experiment with config', async () => {
      const result = await experimentService.startExperiment('test-exp', {
        numTrials: 10,
        effortLevels: [1, 2, 3]
      });
      
      expect(result).toHaveProperty('id', 'test-exp');
      expect(result).toHaveProperty('status');
    });
  });
});