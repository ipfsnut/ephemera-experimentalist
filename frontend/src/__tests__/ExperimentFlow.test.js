import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { ExperimentProvider } from '../context/ExperimentContext';
import ExperimentRunner from '../experiments/NST/Trial';

describe('Critical Path: Experiment Flow', () => {
  test('completes full experiment cycle', async () => {
    const { getByText, getByTestId } = render(
      <ExperimentProvider>
        <ExperimentRunner />
      </ExperimentProvider>
    );

    // Verify initial state
    expect(getByText(/Trial 1\/\d+/)).toBeInTheDocument();
    
    // Complete 3 trials
    for (let i = 0; i < 3; i++) {
      await act(async () => {
        fireEvent.keyDown(document, { key: 'f' });
      });
    }

    // Verify completion
    expect(getByText('Experiment Complete!')).toBeInTheDocument();
  });
});
