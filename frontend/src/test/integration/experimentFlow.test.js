import { renderWithProviders } from '../utils/testUtils';
import { mockExperimentApi } from '../mocks/api';
import { fireEvent, waitFor } from '@testing-library/react';
import ExperimentRunner from '../../experiments/NST/Trial';

jest.mock('../../api/experimentApi', () => mockExperimentApi);

describe('Experiment Flow', () => {
  test('completes full experiment cycle', async () => {
    const { getByText, getByTestId } = renderWithProviders(<ExperimentRunner />);

    // Verify initial render
    expect(getByText(/Trial 1\/10/)).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();

    // Complete trials
    for (let i = 0; i < 10; i++) {
      fireEvent.keyDown(document, { key: 'f' });
      await waitFor(() => {
        expect(mockExperimentApi.submitResponse).toHaveBeenCalled();
      });
    }

    // Verify completion
    await waitFor(() => {
      expect(getByText('Experiment Complete')).toBeInTheDocument();
    });
  });
});
