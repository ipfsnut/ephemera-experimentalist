import '@testing-library/jest-dom';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Add fetch mock
global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({})
  })
);

// Add DOM container cleanup
let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  global.fetch.mockClear();
});

afterEach(() => {
  if (container) {
    document.body.removeChild(container);
    container = null;
  }
});

// React 18 specific setup
global.IS_REACT_ACT_ENVIRONMENT = true;