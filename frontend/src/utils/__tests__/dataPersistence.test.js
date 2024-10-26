import { saveExperimentData, loadExperimentData, clearExperimentData } from '../dataPersistence';

describe('Data Persistence Utils', () => {
  test('saves experiment data to storage', () => {
    const data = {
      sessionId: 'test-123',
      trials: [1, 2, 3],
      responses: ['odd', 'even', 'odd']
    };
    
    const saved = saveExperimentData(data);
    expect(saved.success).toBe(true);
    expect(saved.timestamp).toBeDefined();
  });

  test('loads experiment data from storage', () => {
    const loaded = loadExperimentData('test-123');
    expect(loaded.sessionId).toBe('test-123');
    expect(loaded.trials).toBeInstanceOf(Array);
  });

  test('clears experiment data from storage', () => {
    const cleared = clearExperimentData('test-123');
    expect(cleared.success).toBe(true);
    expect(cleared.clearedAt).toBeDefined();
  });
});
