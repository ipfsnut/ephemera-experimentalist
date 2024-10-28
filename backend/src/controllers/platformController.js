const platformService = require('../services/platformService');
const logger = require('../utils/logger');

class PlatformController {
  async checkHealth(req, res, next) {
    try {
      const health = await platformService.checkHealth();
      res.json(health);
    } catch (error) {
      logger.error('Health check failed:', error);
      next(error);
    }
  }

  async getMetrics(req, res, next) {
    try {
      const metrics = await platformService.getMetrics();
      res.json(metrics);
    } catch (error) {
      logger.error('Failed to retrieve metrics:', error);
      next(error);
    }
  }

  async listExperiments(req, res, next) {
    try {
      const experiments = await platformService.listExperiments();
      res.json(experiments);
    } catch (error) {
      logger.error('Failed to list experiments:', error);
      next(error);
    }
  }

  async getSettings(req, res, next) {
    try {
      const settings = await platformService.getSettings();
      res.json(settings);
    } catch (error) {
      logger.error('Failed to retrieve settings:', error);
      next(error);
    }
  }

  async updateSettings(req, res, next) {
    try {
      const newSettings = req.body;
      const updated = await platformService.updateSettings(newSettings);
      res.json(updated);
    } catch (error) {
      logger.error('Failed to update settings:', error);
      next(error);
    }
  }
}

module.exports = new PlatformController();
