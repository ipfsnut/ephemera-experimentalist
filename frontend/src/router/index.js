import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../platform/Layout';
import ExperimentRunner from '../experiments/NST/Trial';
import CompletionScreen from '../experiments/NST/Completion';
import { ExperimentGuard, CompletionGuard } from './guards';

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<ExperimentRunner />} />
        <Route 
          path="/experiment" 
          element={
            <ExperimentGuard>
              <ExperimentRunner />
            </ExperimentGuard>
          } 
        />
        <Route 
          path="/complete" 
          element={
            <CompletionGuard>
              <CompletionScreen />
            </CompletionGuard>
          } 
        />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default Router;