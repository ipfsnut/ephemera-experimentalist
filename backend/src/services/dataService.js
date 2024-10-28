const { MongoClient } = require('mongodb');
const config = require('../config');

class DataService {
  static async saveTrial(sessionId, trialData) {
    const collection = await this.getCollection('trials');
    const trial = {
      sessionId,
      ...trialData,
      timestamp: Date.now()
    };
    return await collection.insertOne(trial);
  }

  static async getTrials(sessionId) {
    const collection = await this.getCollection('trials');
    return await collection.find({ sessionId }).toArray();
  }

  static async getPerformanceMetrics(experimentId) {
    const collection = await this.getCollection('trials');
    return await collection.aggregate([
      { $match: { experimentId } },
      { $group: {
        _id: '$sessionId',
        avgResponseTime: { $avg: '$responseTime' },
        accuracy: { $avg: { $cond: ['$isCorrect', 1, 0] } }
      }}
    ]).toArray();
  }

  static async getCollection(name) {
    const client = await MongoClient.connect(config.mongoUri);
    return client.db().collection(name);
  }
}

module.exports = DataService;
