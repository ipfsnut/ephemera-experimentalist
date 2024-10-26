import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
  rest.post('/api/experiment/start', (req, res, ctx) => {
    return res(
      ctx.json({
        sessionId: 'test-123',
        config: { totalTrials: 10 }
      })
    );
  }),

  rest.get('/api/experiment/:sessionId/next', (req, res, ctx) => {
    return res(
      ctx.json({
        digit: '5',
        trialNumber: 1
      })
    );
  }),

  rest.post('/api/experiment/:sessionId/response', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        nextTrial: 2
      })
    );
  })
];

export const server = setupServer(...handlers);