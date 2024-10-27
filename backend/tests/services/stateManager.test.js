const stateManager = require('../../services/stateManager');

describe('State Manager', () => {
  test('manages experiment sessions', () => {
    const sessionId = 'test-session';
    const mockExperiment = {
      generateTrials: () => ['12345', '67890'],
      state: {
        currentDigit: 0,
        currentTrialIndex: 0
      },
      trials: ['12345', '67890']
    };
    
    stateManager.createSession(sessionId, mockExperiment);
    expect(stateManager.getSessionState(sessionId)).toBeTruthy();
  });
});
