describe('Controller Integration', () => {
  test('experiment controller starts session correctly', async () => {
    const experimentController = require('../../src/controllers/experimentController');
    const req = {
      params: { experimentId: 'NST' },
      body: { config: {} }
    };
    const res = {
      json: jest.fn()
    };
    
    await experimentController.startExperiment(req, res);
    expect(res.json).toHaveBeenCalled();
  });
});
