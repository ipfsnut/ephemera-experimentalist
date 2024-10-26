import React from 'react';
import { createRoot } from 'react-dom/client';
import { ExperimentProvider } from './context/ExperimentContext';
import Layout from './platform/Layout';
import './styles/global.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ExperimentProvider>
      <Layout />
    </ExperimentProvider>
  </React.StrictMode>
);
