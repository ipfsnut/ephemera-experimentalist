import { handleApiResponse, createApiError, retryRequest } from '../apiUtils';

describe('API Utils', () => {
  test('handles successful responses', async () => {
    const response = { ok: true, json: () => Promise.resolve({ data: 'test' }) };
    const result = await handleApiResponse(response);
    expect(result.data).toBe('test');
  });

  test('retries failed requests', async () => {
    const failOnce = jest.fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({ data: 'success' });

    const result = await retryRequest(() => failOnce(), { retries: 1 });
    expect(result.data).toBe('success');
    expect(failOnce).toHaveBeenCalledTimes(2);
  });

  test('creates formatted API errors', () => {
    const error = createApiError('Failed to fetch', 404);
    expect(error.message).toBe('Failed to fetch');
    expect(error.status).toBe(404);
  });
});
