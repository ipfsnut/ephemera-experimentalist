export const mockExperimentApi = {
  startExperiment: jest.fn().mockResolvedValue({
    sessionId: 'test-123',
    config: { totalTrials: 10 }
  }),

  getNextDigit: jest.fn().mockResolvedValue({
    digit: '5',
    trialNumber: 1
  }),

  submitResponse: jest.fn().mockResolvedValue({
    success: true,
    nextTrial: 2
  }),

  downloadResults: jest.fn().mockResolvedValue(
    new Blob(['mock-data'], { type: 'application/zip' })
  )
};

export const mockApiResponse = (data) => ({
  ok: true,
  json: () => Promise.resolve(data)
});
