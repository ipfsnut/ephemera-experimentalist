const platformService = require('../src/services/platformService');

describe('Platform Service', () => {
  describe('Health Check', () => {
    test('returns healthy system status', async () => {
      const health = await platformService.checkHealth();
      expect(health).toEqual({
        health: 'healthy',
        timestamp: expect.any(Number),
        services: {
          database: true,
          fileSystem: true,
          experimentRunner: true
        }
      });
    });
  });

  describe('Experiment Management', () => {
    test('lists registered experiments', async () => {
      const experiments = await platformService.listExperiments();
      expect(Array.isArray(experiments)).toBe(true);
      if (experiments.length > 0) {
        expect(experiments[0]).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          status: expect.any(String)
        });
      }
    });

    test('manages platform settings', async () => {
      const newSettings = {
        allowNewExperiments: false,
        maxConcurrentSessions: 5
      };
      const updated = await platformService.updateSettings(newSettings);
      expect(updated).toMatchObject(newSettings);
    });
  });
});