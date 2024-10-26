import { render, fireEvent } from '@testing-library/react';
import TrialDisplay from '../TrialDisplay';

describe('TrialDisplay', () => {
  test('handles digit display and responses', () => {
    const mockHandleResponse = jest.fn();
    render(<TrialDisplay digit="5" onResponse={mockHandleResponse} />);
    fireEvent.keyPress(window, { key: 'f' });
    expect(mockHandleResponse).toHaveBeenCalledWith('f');
  });
});