import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isExperiment = location.pathname.includes('/experiment');

  return (
    <header className={`app-header ${isExperiment ? 'minimal' : ''}`}>
      <nav>
        <Link to="/" className="logo">
          Ephemera NST
        </Link>
        {!isExperiment && (
          <>
            <Link to="/about">About</Link>
            <Link to="/config">Configure</Link>
            <Link to="/experiment">Start Experiment</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
