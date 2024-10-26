const fs = require('fs').promises;
const path = require('path');

class MediaHandler {
  constructor(baseDir = path.join(__dirname, '../data/captures')) {
    this.basePath = baseDir;
  }

  async initializeSession(sessionId) {
    const sessionPath = path.join(this.basePath, sessionId);
    await fs.mkdir(sessionPath, { recursive: true });
    return sessionPath;
  }

  async saveCapture(sessionId, trialNumber, digitNumber, imageData) {
    const sessionPath = await this.initializeSession(sessionId);
    const filename = `trial${trialNumber}_digit${digitNumber}.jpg`;
    const filepath = path.join(sessionPath, filename);
    
    await fs.writeFile(filepath, imageData, 'base64');
    
    return {
      filepath,
      timestamp: Date.now(),
      metadata: {
        sessionId,
        trialNumber,
        digitNumber
      }
    };
  }

  async getSessionCaptures(sessionId) {
    const sessionPath = path.join(this.basePath, sessionId);
    const files = await fs.readdir(sessionPath);
    return files.map(file => ({
      filename: file,
      path: path.join(sessionPath, file)
    }));
  }
}

module.exports = { MediaHandler };  // Export the class