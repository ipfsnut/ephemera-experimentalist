const stateManager = require('../../services/stateManager');

describe('State Manager', () => {
  test('manages experiment sessions', () => {
    const sessionId = 'test-session';
    const mockExperiment = {
      getNextDigit: jest.fn(),
      processResponse: jest.fn()
    };
    
    stateManager.createSession(sessionId, mockExperiment);
    expect(stateManager.getSessionState(sessionId)).toBeTruthy();
  });
});
