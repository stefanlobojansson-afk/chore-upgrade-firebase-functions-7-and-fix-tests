const {expect} = require('chai');
const test = require('firebase-functions-test')();

describe('Cloud Functions (Emulator Tests)', () => {
  let myFunctions;

  before(() => {
    myFunctions = require('../index');
  });

  after(() => {
    test.cleanup();
  });

  describe('transcribeAudio', () => {
    it('should return correct structure', () => {
      const req = {
        query: {
          level: 'debug',
        },
      };
      const res = {
        json: (data) => {
          expect(data).to.have.property('message');
          expect(data).to.have.property('level');
          expect(data).to.have.property('version');
          expect(data.level).to.equal('debug');
          expect(data.version).to.equal('7.2.1');
        },
      };

      myFunctions.transcribeAudio(req, res);
    });

    it('should default to info level when not specified', () => {
      const req = {
        query: {},
      };
      const res = {
        json: (data) => {
          expect(data.level).to.equal('info');
        },
      };

      myFunctions.transcribeAudio(req, res);
    });
  });

  describe('getCachedData', () => {
    it('should generate cache key from query parameters', () => {
      const req = {
        query: {
          id: '123',
          type: 'user',
        },
      };
      const res = {
        json: (data) => {
          expect(data).to.have.property('cacheKey');
          expect(data).to.have.property('query');
          expect(data.cacheKey).to.equal('id:123|type:user');
        },
      };

      myFunctions.getCachedData(req, res);
    });

    it('should handle empty query parameters', () => {
      const req = {
        query: {},
      };
      const res = {
        json: (data) => {
          expect(data.cacheKey).to.equal('');
        },
      };

      myFunctions.getCachedData(req, res);
    });
  });
});
