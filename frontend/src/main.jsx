import React from 'react';
import { createRoot } from 'react-dom/client';
import { ExperimentProvider } from './context/ExperimentContext';
import App from './App';
import './styles/global.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ExperimentProvider>
      <App />
    </ExperimentProvider>
  </React.StrictMode>
);