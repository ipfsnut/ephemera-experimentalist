import { experimentReducer } from '../experimentReducer';

describe('experimentReducer', () => {
  test('handles START_EXPERIMENT', () => {
    const initialState = { sessionId: null };
    const action = { 
      type: 'START_EXPERIMENT', 
      payload: { sessionId: 'test-123' }
    };
    
    const newState = experimentReducer(initialState, action);
    expect(newState.sessionId).toBe('test-123');
  });

  test('handles SUBMIT_RESPONSE', () => {
    const initialState = {
      currentTrial: 1,
      results: []
    };
    
    const action = {
      type: 'SUBMIT_RESPONSE',
      payload: { response: 'odd', responseTime: 500 }
    };
    
    const newState = experimentReducer(initialState, action);
    expect(newState.currentTrial).toBe(2);
    expect(newState.results).toHaveLength(1);
  });

  test('handles COMPLETE_EXPERIMENT', () => {
    const initialState = { isComplete: false };
    const action = { type: 'COMPLETE_EXPERIMENT' };
    
    const newState = experimentReducer(initialState, action);
    expect(newState.isComplete).toBe(true);
  });
});
