const experimentController = require('../../controllers/experimentController');
const StateManager = require('../../services/stateManager');
const { getExperiment } = require('../../core/experimentLoader');

describe('Experiment Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      body: {}
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  test('handles missing session', async () => {
    const mockReq = {
      params: { sessionId: 'nonexistent-session' }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await experimentController.getNextDigit(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(404);
  });

  test('starts experiment successfully', async () => {
    req.body = {
      experimentType: 'NST',
      config: { someConfig: true }
    };
    
    await experimentController.startExperiment(req, res);
    
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        sessionId: expect.any(String)
      })
    );
    expect(StateManager.sessions.size).toBe(1);
  });

  test('submits capture successfully', async () => {
    const sessionId = 'test-session';
    req.params.sessionId = sessionId;
    req.body = {
      imageData: 'base64-image-data',
      captureData: { timestamp: Date.now() }
    };
    
    await experimentController.submitCapture(req, res);
    
    expect(res.json).toHaveBeenCalled();
  });

  test('processes response correctly', async () => {
    const sessionId = 'test-session';
    req.params.sessionId = sessionId;
    req.body = {
      response: '12345'
    };
    
    await experimentController.submitResponse(req, res);
    
    expect(res.json).toHaveBeenCalled();
  });
});

jest.mock('../../core/experimentLoader', () => ({
  getExperiment: jest.fn().mockReturnValue(
    class MockExperiment {
      constructor(config) {
        this.config = config;
      }
    }
  )
}));
