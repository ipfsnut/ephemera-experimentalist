import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ExperimentProvider } from '../../context/ExperimentContext';

const renderWithProviders = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <BrowserRouter>
      <ExperimentProvider>
        {ui}
      </ExperimentProvider>
    </BrowserRouter>
  );
};

const createMockEvent = (key) => ({
  key,
  preventDefault: jest.fn(),
  stopPropagation: jest.fn()
});

export { renderWithProviders, createMockEvent };
