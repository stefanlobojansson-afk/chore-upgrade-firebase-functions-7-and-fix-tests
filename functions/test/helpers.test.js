const {expect} = require('chai');
const functions = require('../index');

describe('Test Helpers', () => {
  describe('normalizeLevelParam', () => {
    const {normalizeLevelParam} = functions.__test__;

    it('should return "info" for undefined', () => {
      expect(normalizeLevelParam(undefined)).to.equal('info');
    });

    it('should return "info" for null', () => {
      expect(normalizeLevelParam(null)).to.equal('info');
    });

    it('should return "debug" for "debug"', () => {
      expect(normalizeLevelParam('debug')).to.equal('debug');
    });

    it('should return "info" for "info"', () => {
      expect(normalizeLevelParam('info')).to.equal('info');
    });

    it('should return "warn" for "warn"', () => {
      expect(normalizeLevelParam('warn')).to.equal('warn');
    });

    it('should return "error" for "error"', () => {
      expect(normalizeLevelParam('error')).to.equal('error');
    });

    it('should normalize to lowercase', () => {
      expect(normalizeLevelParam('DEBUG')).to.equal('debug');
      expect(normalizeLevelParam('INFO')).to.equal('info');
      expect(normalizeLevelParam('WARN')).to.equal('warn');
      expect(normalizeLevelParam('ERROR')).to.equal('error');
    });

    it('should return "info" for invalid level', () => {
      expect(normalizeLevelParam('invalid')).to.equal('info');
      expect(normalizeLevelParam('critical')).to.equal('info');
    });

    it('should convert numbers to string and validate', () => {
      expect(normalizeLevelParam(123)).to.equal('info');
    });
  });

  describe('makeCacheKey', () => {
    const {makeCacheKey} = functions.__test__;

    it('should return empty string for null', () => {
      expect(makeCacheKey(null)).to.equal('');
    });

    it('should return empty string for undefined', () => {
      expect(makeCacheKey(undefined)).to.equal('');
    });

    it('should return empty string for non-object', () => {
      expect(makeCacheKey('string')).to.equal('');
      expect(makeCacheKey(123)).to.equal('');
    });

    it('should return empty string for empty object', () => {
      expect(makeCacheKey({})).to.equal('');
    });

    it('should create cache key from single parameter', () => {
      expect(makeCacheKey({id: '123'})).to.equal('id:123');
    });

    it('should create cache key from multiple parameters', () => {
      const result = makeCacheKey({id: '123', name: 'test'});
      expect(result).to.equal('id:123|name:test');
    });

    it('should sort keys deterministically', () => {
      const key1 = makeCacheKey({b: '2', a: '1', c: '3'});
      const key2 = makeCacheKey({c: '3', a: '1', b: '2'});
      expect(key1).to.equal(key2);
      expect(key1).to.equal('a:1|b:2|c:3');
    });

    it('should handle complex parameter values', () => {
      const result = makeCacheKey({
        userId: 'user-123',
        action: 'read',
        timestamp: '2024-01-01',
      });
      expect(result).to.equal('action:read|timestamp:2024-01-01|userId:user-123');
    });
  });
});
