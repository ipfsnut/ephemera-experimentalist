const experimentController = require('../../src/controllers/experimentController');
const experimentService = require('../../src/services/experimentService');
const BaseExperiment = require('../../core/baseExperiment');

describe('Experiment Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const mockExperiment = new BaseExperiment({
      id: 'test-exp',
      name: 'Test Experiment'
    });
    experimentService.registerExperiment(mockExperiment);
  });

  test('starts experiment successfully', async () => {
    const req = { params: { experimentId: 'test-exp' }, body: {} };
    const res = { json: jest.fn() };
    const next = jest.fn();
    
    await experimentController.startExperiment(req, res, next);
    expect(res.json).toHaveBeenCalled();
  });
});
