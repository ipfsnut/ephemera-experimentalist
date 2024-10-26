import { experimentApi } from '../experimentApi';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('/api/experiment/start', (req, res, ctx) => {
    return res.once(
      ctx.status(503),
      ctx.json({ error: 'Service unavailable' })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Network Retry Logic', () => {
  test('retries failed requests', async () => {
    let attempts = 0;
    
    server.use(
      rest.post('/api/experiment/start', (req, res, ctx) => {
        attempts++;
        if (attempts === 1) {
          return res(ctx.status(503));
        }
        return res(ctx.json({ sessionId: 'test-123' }));
      })
    );

    const result = await experimentApi.startExperiment('NST', {});
    expect(attempts).toBe(2);
    expect(result.data.sessionId).toBe('test-123');
  });
});
