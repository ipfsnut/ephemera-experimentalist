module.exports = {
  testEnvironmentOptions: {
    timers: 'modern',
    executionTimeLimit: 5000
  },
  maxWorkers: '50%',
  maxConcurrency: 5,
  timers: 'modern',
  setupFilesAfterEnv: [
    '<rootDir>/src/test/performance/setup.js'
  ],
  reporters: [
    'default',
    [
      './node_modules/jest-slow-test-reporter',
      {
        numTests: 10,
        warnOnSlowerThan: 300,
        color: true
      }
    ]
  ],
  verbose: true
};
