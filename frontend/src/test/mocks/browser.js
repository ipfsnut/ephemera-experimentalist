import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// Separate handlers for browser environment
export const browserHandlers = [
  ...handlers,
  // Browser-specific handlers
  rest.get('/api/experiment/status', (req, res, ctx) => {
    return res(
      ctx.json({
        status: 'running',
        browserInfo: {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language
        }
      })
    );
  })
];

worker.use(...browserHandlers);
