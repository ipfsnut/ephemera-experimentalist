const experimentController = require('../../src/controllers/experimentController');const StateManager = require('../../services/stateManager');
const { getExperiment } = require('../../core/experimentLoader');
const NSTExperiment = require('../../experiments/NSTExperiment');

jest.mock('../../experiments/NSTExperiment', () => {
  return class MockNSTExperiment {
    constructor(config) {
      this.config = config;
      this.trials = [];
    }
    
    generateTrials() {
      this.trials = ['12345', '67890'];
      return this.trials;
    }
  };
});

describe('Experiment Controller', () => {
  let req, res;
  
  beforeEach(() => {
    req = {
      body: {
        experimentType: 'NST',
        config: { someConfig: true }
      }
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  test('starts experiment successfully', async () => {
    await experimentController.startExperiment(req, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        sessionId: expect.any(String)
      })
    );
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


