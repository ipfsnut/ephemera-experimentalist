import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Platform/Dashboard';
import NST from '../experiments/NST';
import Results from '../experiments/NST/Results';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Platform Layer */}
      <Route path="/" element={<Navigate to="/platform/dashboard" replace />} />
      <Route path="/platform">
        <Route path="dashboard" element={<Dashboard />} />
        {/* Experiment Framework Layer */}
        <Route path="experiments">
          {/* Individual Experiment Layer */}
          <Route path="nst">
            <Route index element={<NST />} />
            <Route path="results" element={<Results />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;