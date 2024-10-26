import { renderHook, act } from '@testing-library/react-hooks';
import useTrialTransition from '../useTrialTransition';

describe('useTrialTransition', () => {
  test('handles digit transitions', () => {
    const { result, rerender } = renderHook(
      ({ digit }) => useTrialTransition(digit),
      { initialProps: { digit: '5' } }
    );

    expect(result.current.displayDigit).toBe('5');
    
    act(() => {
      rerender({ digit: '7' });
    });

    expect(result.current.isTransitioning).toBe(true);
  });
});
