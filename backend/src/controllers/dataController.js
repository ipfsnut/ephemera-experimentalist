const DataService = require('../services/dataService');
const logger = require('../utils/logger');

class DataController {
  async exportData(req, res, next) {
    try {
      const { experimentId } = req.params;
      const data = await DataService.exportData(experimentId);
      res.json(data);
    } catch (error) {
      logger.error('Export failed:', error);
      next(error);
    }
  }

  async getAnalysis(req, res, next) {
    try {
      const { experimentId } = req.params;
      const analysis = await DataService.getAnalysis(experimentId);
      res.json(analysis);
    } catch (error) {
      logger.error('Analysis failed:', error);
      next(error);
    }
  }

  async getResults(req, res, next) {
    try {
      const { sessionId } = req.params;
      const results = await DataService.getResults(sessionId);
      res.json(results);
    } catch (error) {
      logger.error('Getting results failed:', error);
      next(error);
    }
  }

  async createBackup(req, res, next) {
    try {
      const backup = await DataService.createBackup();
      res.json(backup);
    } catch (error) {
      logger.error('Creating backup failed:', error);
      next(error);
    }
  }

  async getSessionTimeline(req, res, next) {
    try {
      const { sessionId } = req.params;
      const timeline = await DataService.getSessionTimeline(sessionId);
      res.json(timeline);
    } catch (error) {
      logger.error('Getting session timeline failed:', error);
      next(error);
    }
  }

  async addAnnotation(req, res, next) {
    try {
      const { sessionId } = req.params;
      const annotation = await DataService.addAnnotation(sessionId, req.body);
      res.json(annotation);
    } catch (error) {
      logger.error('Adding annotation failed:', error);
      next(error);
    }
  }

  async getAggregateStats(req, res, next) {
    try {
      const { experimentId } = req.params;
      const stats = await DataService.getAggregateStats(experimentId);
      res.json(stats);
    } catch (error) {
      logger.error('Getting aggregate stats failed:', error);
      next(error);
    }
  }

  async saveTrial(req, res, next) {
    try {
      const { sessionId } = req.params;
      const trialData = {
        sessionId,
        ...req.body,
        timestamp: Date.now()
      };
      const trial = await DataService.saveTrial(trialData);
      res.json(trial);
    } catch (error) {
      logger.error('Saving trial failed:', error);
      next(error);
    }
  }

  async getTrials(req, res, next) {
    try {
      const { sessionId } = req.params;
      const trials = await DataService.getTrials(sessionId);
      res.json(trials);
    } catch (error) {
      logger.error('Getting trials failed:', error);
      next(error);
    }
  }

  async getPerformanceMetrics(req, res, next) {
    try {
      const { experimentId } = req.params;
      const metrics = await DataService.getPerformanceMetrics(experimentId);
      res.json(metrics);
    } catch (error) {
      logger.error('Getting performance metrics failed:', error);
      next(error);
    }
  }
}

module.exports = new DataController();module.exports = new DataController();