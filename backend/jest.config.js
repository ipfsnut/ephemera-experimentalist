module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  testMatch: ['**/*.test.js'],
  collectCoverageFrom: [
    'experiments/**/*.js',
    'core/**/*.js',
    'utils/**/*.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80
    }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js']
};