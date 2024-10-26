import React from 'react';
import './Loading.css';

const Loading = () => (
  <div className="loading-container">
    <div className="loading-spinner">
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
    </div>
    <div className="loading-text">Loading Experiment...</div>
  </div>
);

export default Loading;
