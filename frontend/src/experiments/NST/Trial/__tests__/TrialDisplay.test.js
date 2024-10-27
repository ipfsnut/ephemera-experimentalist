import { render, fireEvent, screen } from '@testing-library/react';
import { ExperimentProvider } from '../../../../context/ExperimentContext';
import TrialDisplay from '../TrialDisplay';

describe('TrialDisplay', () => {
  const renderWithProvider = (ui) => {
    return render(
      <ExperimentProvider>{ui}</ExperimentProvider>
    );
  };

  test('handles digit display and responses', () => {
    const mockHandleResponse = jest.fn();
    renderWithProvider(
      <TrialDisplay 
        digit="5" 
        currentTrial={1}
        totalTrials={10}
        onResponse={mockHandleResponse} 
      />
    );

    // Verify digit is displayed
    expect(screen.getByText('5')).toBeInTheDocument();

    // Test keyboard response
    fireEvent.keyPress(document, { key: 'f', code: 'KeyF' });
    expect(mockHandleResponse).toHaveBeenCalledWith('f');

    // Test instruction text
    expect(screen.getByText(/press 'f' for odd numbers/i)).toBeInTheDocument();
  });

  test('shows trial progress', () => {
    renderWithProvider(
      <TrialDisplay 
        digit="5" 
        currentTrial={1} 
        totalTrials={10}
        onResponse={jest.fn()} 
      />
    );
    
    expect(screen.getByText('Trial 1/10')).toBeInTheDocument();
  });
});