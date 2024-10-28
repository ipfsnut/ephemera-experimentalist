const nstService = require('../src/services/nstService');

describe('NST Service', () => {
  describe('Trial Management', () => {
    test('provides next digit with correct trial state', async () => {
      const digit = await nstService.getNextDigit();
      expect(digit).toBeDefined();
      
      const trialState = await nstService.getTrialState();
      expect(trialState).toMatchObject({
        currentTrial: expect.any(Number),
        currentDigit: expect.any(Number), // Changed from String
        requiresCapture: expect.any(Boolean)
      });
    });

    test('processes responses correctly', async () => {
      const response = await nstService.processResponse({
        response: 'odd',
        timestamp: Date.now()
      });
      
      expect(response).toMatchObject({
        isCorrect: expect.any(Boolean),
        trialComplete: true
      });
    });
  });

  describe('Capture Management', () => {
    test('handles capture configuration', async () => {
      const config = await nstService.getCaptureConfig();
      expect(config).toMatchObject({
        enabled: expect.any(Boolean),
        interval: expect.any(String),
        shouldCapture: expect.any(Boolean),
        currentTrial: expect.any(Number)
      });
    });
  });
});

beforeEach(() => {
  nstService.trials = [
    { number: 5, type: 'odd' },
    { number: 2, type: 'even' }
  ];
});
