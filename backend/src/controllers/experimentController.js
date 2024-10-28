const experimentService = require('../services/experimentService');
const logger = require('../utils/logger');

class ExperimentController {
  async listExperiments(req, res, next) {
    try {
      const experiments = await experimentService.getAvailableExperiments();
      res.json(experiments);
    } catch (error) {
      logger.error('Failed to list experiments:', error);
      next(error);
    }
  }

  async getExperimentInfo(req, res, next) {
    try {
      const { experimentId } = req.params;
      const info = await experimentService.getExperimentInfo(experimentId);
      res.json(info);
    } catch (error) {
      logger.error('Failed to get experiment info:', error);
      next(error);
    }
  }

  async getConfig(req, res, next) {
    try {
      const { experimentId } = req.params;
      const config = await experimentService.getConfig(experimentId);
      res.json(config);
    } catch (error) {
      logger.error('Failed to get config:', error);
      next(error);
    }
  }

  async updateConfig(req, res, next) {
    try {
      const { experimentId } = req.params;
      const config = await experimentService.updateConfig(experimentId, req.body);
      res.json(config);
    } catch (error) {
      logger.error('Failed to update config:', error);
      next(error);
    }
  }

  async validateConfig(req, res, next) {
    try {
      const { experimentId } = req.params;
      const validation = await experimentService.validateConfig(experimentId, req.body);
      res.json(validation);
    } catch (error) {
      logger.error('Config validation failed:', error);
      next(error);
    }
  }

  async startExperiment(req, res, next) {
    try {
      const { experimentId } = req.params;
      const session = await experimentService.startExperiment(experimentId, req.body);
      res.json(session);
    } catch (error) {
      logger.error('Failed to start experiment:', error);
      next(error);
    }
  }

  async pauseExperiment(req, res, next) {
    try {
      const { experimentId } = req.params;
      const result = await experimentService.pauseExperiment(experimentId);
      res.json(result);
    } catch (error) {
      logger.error('Failed to pause experiment:', error);
      next(error);
    }
  }

  async resumeExperiment(req, res, next) {
    try {
      const { experimentId } = req.params;
      const result = await experimentService.resumeExperiment(experimentId);
      res.json(result);
    } catch (error) {
      logger.error('Failed to resume experiment:', error);
      next(error);
    }
  }

  async abortExperiment(req, res, next) {
    try {
      const { experimentId } = req.params;
      const result = await experimentService.abortExperiment(experimentId);
      res.json(result);
    } catch (error) {
      logger.error('Failed to abort experiment:', error);
      next(error);
    }
  }
}

module.exports = new ExperimentController();