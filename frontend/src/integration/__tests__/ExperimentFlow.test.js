import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { ExperimentProvider } from '../../context/ExperimentContext';
import ExperimentRunner from '../../experiments/NST/Trial';

describe('Experiment Flow Integration', () => {
  test('completes full experiment cycle', async () => {
    const { getByText, getByTestId } = render(
      <ExperimentProvider>
        <ExperimentRunner />
      </ExperimentProvider>
    );

    // Start experiment
    await act(async () => {
      fireEvent.click(getByText('Start'));
    });

    // Complete trials
    for (let i = 0; i < 3; i++) {
      await act(async () => {
        fireEvent.keyDown(document, { key: 'f' });
      });
    }

    expect(getByText('Experiment Complete!')).toBeInTheDocument();
  });

  test('handles response transitions', async () => {
    const { getByTestId } = render(
      <ExperimentProvider>
        <ExperimentRunner />
      </ExperimentProvider>
    );

    await act(async () => {
      fireEvent.keyDown(document, { key: 'f' });
    });

    expect(getByTestId('trial-counter')).toHaveTextContent('Trial 2/10');
  });
});
