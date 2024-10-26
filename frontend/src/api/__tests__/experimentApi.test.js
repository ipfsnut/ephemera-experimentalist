import { experimentApi } from '../experimentApi';
import axios from 'axios';

jest.mock('axios');

describe('Experiment API', () => {
  const mockSessionId = 'test-session-123';
  
  beforeEach(() => {
    axios.create.mockReturnValue(axios);
  });

  test('starts experiment successfully', async () => {
    const mockResponse = { data: { sessionId: mockSessionId } };
    axios.post.mockResolvedValue(mockResponse);

    const config = { trialsPerLevel: 3 };
    const result = await experimentApi.startExperiment('NST', config);
    
    expect(result.data.sessionId).toBe(mockSessionId);
    expect(axios.post).toHaveBeenCalledWith('/experiment/start', {
      experimentType: 'NST',
      config
    });
  });

  test('gets next digit', async () => {
    const mockDigit = { data: { digit: '12345', captureRequired: true } };
    axios.get.mockResolvedValue(mockDigit);

    const result = await experimentApi.getNextDigit(mockSessionId);
    
    expect(result.data.digit).toBe('12345');
    expect(axios.get).toHaveBeenCalledWith(`/experiment/${mockSessionId}/next`);
  });
});

  test('submits capture data', async () => {
    const mockResponse = { data: { success: true } };
    axios.post.mockResolvedValue(mockResponse);

    const imageData = 'base64-image';
    const captureData = { timestamp: Date.now() };
    const result = await experimentApi.submitCapture(mockSessionId, imageData, captureData);
    
    expect(result.data.success).toBe(true);
    expect(axios.post).toHaveBeenCalledWith(
      `/experiment/${mockSessionId}/capture`,
      { imageData, captureData }
    );
  });

  test('submits response data', async () => {
    const mockResponse = { data: { success: true } };
    axios.post.mockResolvedValue(mockResponse);

    const response = '12345';
    const result = await experimentApi.submitResponse(mockSessionId, response);
    
    expect(result.data.success).toBe(true);
    expect(axios.post).toHaveBeenCalledWith(
      `/experiment/${mockSessionId}/response`,
      { response }
    );
  });

  test('gets experiment state', async () => {
    const mockState = { data: { state: 'RUNNING' } };
    axios.get.mockResolvedValue(mockState);

    const result = await experimentApi.getExperimentState(mockSessionId);
    
    expect(result.data.state).toBe('RUNNING');
    expect(axios.get).toHaveBeenCalledWith(`/experiment/${mockSessionId}/state`);
  });

  test('downloads results', async () => {
    const mockBlob = new Blob(['test data']);
    axios.get.mockResolvedValue({ data: mockBlob });

    const result = await experimentApi.downloadResults(mockSessionId);
    
    expect(result.data).toBe(mockBlob);
    expect(axios.get).toHaveBeenCalledWith(
      `/experiment/${mockSessionId}/results`,
      { responseType: 'blob' }
    );
  });
