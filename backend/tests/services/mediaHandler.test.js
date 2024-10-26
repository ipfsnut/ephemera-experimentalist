const { MediaHandler } = require('../../services/mediaHandler');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');

describe('Media Handler', () => {
  let testDir;
  let handler;
  const testSessionId = 'test-session-123';
  const mockImageData = Buffer.from('test-image-data').toString('base64');

  beforeEach(async () => {
    // Create fresh temporary directory for each test
    testDir = path.join(os.tmpdir(), 'test-captures-' + Date.now());
    handler = new MediaHandler(testDir);
    await handler.initializeSession(testSessionId);
  });

  afterEach(async () => {
    // Clean up test directory after each test
    await fs.rm(testDir, { recursive: true, force: true });
  });

  test('saves image captures with correct metadata', async () => {
    const result = await handler.saveCapture(
      testSessionId,
      1,
      3,
      mockImageData
    );

    expect(result).toMatchObject({
      metadata: {
        sessionId: testSessionId,
        trialNumber: 1,
        digitNumber: 3
      }
    });
  });

  test('retrieves all captures for a session', async () => {
    await handler.saveCapture(testSessionId, 1, 1, mockImageData);
    await handler.saveCapture(testSessionId, 1, 2, mockImageData);

    const captures = await handler.getSessionCaptures(testSessionId);
    expect(captures).toHaveLength(2);
  });
});