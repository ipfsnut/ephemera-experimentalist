const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const StateManager = require('../services/stateManager');

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  // Clear MongoDB collections
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
  // Clear experiment sessions
  StateManager.sessions.clear();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

// Add our experiment test utilities
global.createTestSession = (experimentType, config) => {
  const sessionId = `test-${Date.now()}`;
  const ExperimentClass = require('../experiments/numberSwitching');
  const experiment = new ExperimentClass(config);
  experiment.generateTrials();
  StateManager.createSession(sessionId, experiment);
  return sessionId;
};

// Add custom matchers
expect.extend({
  toBeValidTrialResponse(received) {
    return {
      pass: received.hasOwnProperty('isCorrect') && 
            received.hasOwnProperty('responseTime') &&
            received.hasOwnProperty('trial'),
      message: () => 'Expected response to contain valid trial data'
    };
  }
});