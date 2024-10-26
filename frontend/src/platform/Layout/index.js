import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ExperimentProvider } from '../../context/ExperimentContext';
import Header from './Header';
import Routes from './Routes';

const Layout = () => {
  return (
    <BrowserRouter>
      <ExperimentProvider>
        <div className="app-container">
          <Header />
          <main className="content">
            <Routes />
          </main>
        </div>
      </ExperimentProvider>
    </BrowserRouter>
  );
};

export default Layout;