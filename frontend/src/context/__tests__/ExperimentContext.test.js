import { renderHook, act } from '@testing-library/react-hooks';
import { useExperiment, ExperimentProvider } from '../ExperimentContext';

describe('ExperimentContext', () => {
  test('provides initial state', () => {
    const { result } = renderHook(() => useExperiment(), {
      wrapper: ExperimentProvider
    });
    
    expect(result.current.state).toEqual({
      sessionId: null,
      currentTrial: 1,
      totalTrials: 10,
      results: []
    });
  });

  test('handles state updates', () => {
    const { result } = renderHook(() => useExperiment(), {
      wrapper: ExperimentProvider
    });

    act(() => {
      result.current.dispatch({ 
        type: 'START_EXPERIMENT', 
        payload: { sessionId: 'test-123' }
      });
    });

    expect(result.current.state.sessionId).toBe('test-123');
  });
});