import { createSession, validateSession, cleanupSession } from '../sessionManagement';

describe('Session Management Utils', () => {
  test('creates valid experiment sessions', () => {
    const session = createSession({
      participantId: 'P123',
      experimentType: 'NST'
    });
    
    expect(session.id).toBeDefined();
    expect(session.startTime).toBeDefined();
    expect(session.status).toBe('active');
  });

  test('validates session integrity', () => {
    const validSession = {
      id: 'test-123',
      trials: [1, 2, 3],
      responses: [true, false, true]
    };
    
    expect(validateSession(validSession)).toBe(true);
    expect(validateSession({ id: 'test-123' })).toBe(false);
  });

  test('cleans up completed sessions', () => {
    const cleanup = cleanupSession('test-123');
    expect(cleanup.success).toBe(true);
    expect(cleanup.cleanedData).toBeDefined();
  });
});
