const expect = require('expect.js');
const ward = require('../src/index.js');
const ValidationError = require('../src/errors/validation.js');
const ERROR_MESSAGES = require('../src/error-messages.js');

const validator = ward.getSchemaValidator({
  example: {
    email: [{ n: 'isEmail' }, { n: 'isRequired' }],
  },
});

describe('Validator::', () => {
  it('should return error when no schema', (done) => {
    validator('non-existing-schema', {}, (err, result) => {
      expect(err).to.be.a(ValidationError);
      expect(err.message).to.be.equal(ERROR_MESSAGES.NO_SCHEMA);
      expect(result).to.be.equal(null);
      done();
    });
  });
  it('should not return error when schema exists', (done) => {
    validator('example', {}, (err, result) => {
      expect(err).to.be.a(ValidationError);
      expect(err.message).to.not.be.equal(ERROR_MESSAGES.NO_SCHEMA);
      expect(err.message).to.be.equal(ERROR_MESSAGES.VALIDATION);
      expect(result).to.be.equal(null);
      done();
    });
  });
});
