const experimentService = require('../services/experimentService');
const logger = require('../utils/logger');
const archiver = require('archiver');
const { MediaHandler } = require('../../services/mediaHandler');  // Updated path
class ExperimentController {
  constructor(mediaHandler) {
    this.mediaHandler = mediaHandler;
  }

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

  async handleResponse(req, res, next) {
    try {
      const { experimentId } = req.params;
      const { sessionId, digit, response, timestamp, captureData } = req.body;

      // Validate and save capture if present
      let captureResult;
      if (captureData) {
        const validationResult = await this.mediaHandler.validateCapture(captureData);
        if (!validationResult.isValid) {
          throw new AppError('Invalid capture data', 400);
        }
        
        captureResult = await this.mediaHandler.saveTrialCapture(
          sessionId,
          digit,
          captureData
        );
      }

      // Process response through experiment service
      const result = await experimentService.processResponse(
        experimentId,
        sessionId,
        { 
          digit, 
          response, 
          timestamp,
          captureId: captureResult?.metadata?.captureId
        }
      );

      res.json({
        result,
        capture: captureResult
      });

    } catch (error) {
      logger.error('Failed to process response:', error);
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

  async exportSessionData(req, res, next) {
    try {
      const { experimentId, sessionId } = req.params;
      const mediaHandler = new MediaHandler();
      
      res.attachment(`${experimentId}-session-${sessionId}.zip`);
      const archive = archiver('zip', { zlib: { level: 9 } });
      archive.pipe(res);

      const captures = await mediaHandler.getSessionCaptures(sessionId);
      captures.forEach(capture => {
        archive.file(capture.path, { name: `images/${capture.filename}` });
      });

      const responses = await experimentService.getSessionResponses(sessionId);
      const csvData = this.convertToCSV(responses);
      archive.append(csvData, { name: 'responses.csv' });

      archive.finalize();
    } catch (error) {
      logger.error('Failed to export session data:', error);
      next(error);
    }
  }

  convertToCSV(responses) {
    const headers = ['trialNumber', 'digit', 'response', 'isCorrect', 'timestamp'];
    const rows = responses.map(r => 
      `${r.trialNumber},${r.digit},${r.response},${r.isCorrect},${r.timestamp}`
    );
    return [headers.join(','), ...rows].join('\n');
  }

  async getSessionData(req, res, next) {
    try {
      const { sessionId } = req.params;
      const captures = await this.mediaHandler.getSessionCaptures(sessionId);
      const experimentData = await experimentService.getSessionData(sessionId);
      
      res.json({
        captures,
        experimentData
      });
    } catch (error) {
      logger.error('Failed to get session data:', error);
      next(error);
    }
  }
}


module.exports = new ExperimentController();
