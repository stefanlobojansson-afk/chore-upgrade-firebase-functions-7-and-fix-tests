const functions = require('firebase-functions');
const admin = require('firebase-admin');
// eslint-disable-next-line no-unused-vars
const speech = require('@google-cloud/speech');

admin.initializeApp();

/**
 * Helper function to normalize level parameter
 * Ensures the level parameter is valid and returns a normalized value
 * @param {*} level - The level parameter to normalize
 * @return {string} The normalized level
 */
function normalizeLevelParam(level) {
  if (level === undefined || level === null) {
    return 'info';
  }

  const normalizedLevel = String(level).toLowerCase();
  const validLevels = ['debug', 'info', 'warn', 'error'];

  if (validLevels.includes(normalizedLevel)) {
    return normalizedLevel;
  }

  return 'info';
}

/**
 * Helper function to create a cache key
 * Generates a deterministic cache key from the provided parameters
 * @param {Object} params - The parameters to create a cache key from
 * @return {string} The cache key
 */
function makeCacheKey(params) {
  if (!params || typeof params !== 'object') {
    return '';
  }

  const keys = Object.keys(params).sort();
  const parts = keys.map((key) => `${key}:${params[key]}`);
  return parts.join('|');
}

// Example function using the Speech API
exports.transcribeAudio = functions.https.onRequest(async (req, res) => {
  // Speech client initialization (unused in this example)
  // const client = new speech.SpeechClient();
  const level = normalizeLevelParam(req.query.level);

  functions.logger.log(`Processing request with level: ${level}`);

  res.json({
    message: 'Speech API is ready',
    level: level,
    version: '7.2.1',
  });
});

// Example function demonstrating cache key usage
exports.getCachedData = functions.https.onRequest((req, res) => {
  const cacheKey = makeCacheKey(req.query);

  functions.logger.info(`Cache key generated: ${cacheKey}`);

  res.json({
    cacheKey: cacheKey,
    query: req.query,
  });
});

// Export helpers for testing
exports.__test__ = {
  normalizeLevelParam,
  makeCacheKey,
};
