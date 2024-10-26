import { renderHook, act } from '@testing-library/react-hooks';
import useResponseHandler from '../useResponseHandler';

describe('useResponseHandler', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('captures response times accurately', () => {
    const onTrialComplete = jest.fn();
    const { result } = renderHook(() => useResponseHandler(onTrialComplete));

    act(() => {
      result.current.startTrial();
      jest.advanceTimersByTime(500);
      result.current.handleResponse('odd');
    });

    expect(onTrialComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        response: 'odd',
        responseTime: 500
      })
    );
  });
});
