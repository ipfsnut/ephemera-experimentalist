const DataService = require('../services/dataService');

const dataController = {
  async saveTrial(req, res) {
    const { sessionId } = req.params;
    const trialData = req.body;
    const result = await DataService.saveTrial(sessionId, trialData);
    res.json(result);
  },

  async getTrials(req, res) {
    const { sessionId } = req.params;
    const trials = await DataService.getTrials(sessionId);
    res.json(trials);
  },

  async getPerformanceMetrics(req, res) {
    const { experimentId } = req.params;
    const metrics = await DataService.getPerformanceMetrics(experimentId);
    res.json(metrics);
  }
};

module.exports = dataController;
