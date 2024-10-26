const DEBUG = process.env.NODE_ENV === 'development';

export const logger = {
  info: (...args) => DEBUG && console.log('[INFO]', ...args),
  warn: (...args) => DEBUG && console.warn('[WARN]', ...args),
  error: (...args) => DEBUG && console.error('[ERROR]', ...args),
  trial: (trialNum, response, rt) => DEBUG && console.log(
    `[TRIAL ${trialNum}]`,
    `Response: ${response}`,
    `RT: ${rt}ms`
  )
};

export const measurePerformance = (label) => {
  if (!DEBUG) return () => {};
  
  console.time(label);
  return () => console.timeEnd(label);
};
