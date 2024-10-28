const nstService = require('../services/nstService');
const logger = require('../utils/logger');

class NSTController {
  async getNextDigit(req, res, next) {
    try {
      const nextDigit = await nstService.getNextDigit();
      res.json({
        digit: nextDigit,
        trialState: await nstService.getTrialState(),
        captureRequired: await nstService.shouldCaptureImage()
      });
    } catch (error) {
      logger.error('Failed to get next digit:', error);
      next(error);
    }
  }

  async submitResponse(req, res, next) {
    try {
      const { response } = req.body;
      const result = await nstService.processResponse(response);
      res.json(result);
    } catch (error) {
      logger.error('Failed to process response:', error);
      next(error);
    }
  }

  async getProgress(req, res, next) {
    try {
      const progress = await nstService.getProgress();
      res.json(progress);
    } catch (error) {
      logger.error('Failed to get progress:', error);
      next(error);
    }
  }

  async submitCapture(req, res, next) {
    try {
      const { imageData, metadata } = req.body;
      const result = await nstService.processCapture(imageData, metadata);
      res.json(result);
    } catch (error) {
      logger.error('Failed to process capture:', error);
      next(error);
    }
  }

  async getCaptureConfig(req, res, next) {
    try {
      const config = await nstService.getCaptureConfig();
      res.json(config);
    } catch (error) {
      logger.error('Failed to get capture config:', error);
      next(error);
    }
  }

  async getExperimentState(req, res, next) {
    try {
      const state = await nstService.getExperimentState();
      res.json(state);
    } catch (error) {
      logger.error('Failed to get experiment state:', error);
      next(error);
    }
  }

  async getTrialState(req, res, next) {
    try {
      const state = await nstService.getTrialState();
      res.json(state);
    } catch (error) {
      logger.error('Failed to get trial state:', error);
      next(error);
    }
  }

  async getNSTConfig(req, res, next) {
    try {
      const config = await nstService.getConfig();
      res.json(config);
    } catch (error) {
      logger.error('Failed to get NST config:', error);
      next(error);
    }
  }

  async updateNSTConfig(req, res, next) {
    try {
      const config = await nstService.updateConfig(req.body);
      res.json(config);
    } catch (error) {
      logger.error('Failed to update NST config:', error);
      next(error);
    }
  }
}

module.exports = new NSTController();