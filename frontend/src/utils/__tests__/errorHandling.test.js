import { handleExperimentError, logError, createErrorReport } from '../errorHandling';

describe('Error Handling Utils', () => {
  test('handles experiment errors with proper context', () => {
    const error = new Error('Trial failed');
    const context = { trialNumber: 5, sessionId: 'test-123' };
    
    const handled = handleExperimentError(error, context);
    expect(handled.code).toBe('TRIAL_ERROR');
    expect(handled.context).toMatchObject(context);
  });

  test('logs errors with timestamps', () => {
    const errorLog = logError('API_ERROR', 'Failed to fetch');
    expect(errorLog.timestamp).toBeDefined();
    expect(errorLog.type).toBe('API_ERROR');
  });

  test('creates detailed error reports', () => {
    const report = createErrorReport({
      type: 'VALIDATION_ERROR',
      message: 'Invalid response',
      sessionId: 'test-123'
    });
    
    expect(report.summary).toBeDefined();
    expect(report.stackTrace).toBeDefined();
    expect(report.sessionContext).toBeDefined();
  });
});
