const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const session = require('express-session');
const routes = require('./routes');  // Change: Import consolidated routes

const app = express();

// Add CORS middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Helmet configuration
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// Session configuration
app.use(session({
  secret: 'nst-experiment-secret',
  resave: true,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    sameSite: 'lax'
  }
}));

app.use(morgan('dev'));
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Routes
// Change: Use consolidated routing through index.js
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

module.exports = app;