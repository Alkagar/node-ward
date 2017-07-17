const expect = require('expect.js');
const getValidator = require('../src/index.js');
const ValidationError = require('../src/errors/validation.js');

const validator = getValidator({
  example: {
    email: [{ n: 'isEmail' }, { n: 'isRequired' }],
  },
});

describe('Validators', () => {
  describe('isEmail custom tests', () => {
    const wrongData = { email: 1 };
    it('should check if data is string before email', (done) => {
      validator('example', wrongData, (err) => {
        const validationDetails = err.details.validationResult;
        const messages = validationDetails.map(detail => detail.message);
        expect(messages).to.contain('error.validate.not-string');
        done();
      });
    });
  });

  describe('isEmail generic tests', () => {
    const correctData = { email: 'john@example.com' };
    const wrongData = { email: 'not-email' };
    const fieldName = 'email';
    const errorMessage = 'error.validate.is-not-email';

    it('all error details should have fieldName property', (done) => {
      validator('example', wrongData, (err) => {
        const validationDetails = err.details.validationResult;
        validationDetails.forEach(detail =>
          expect(detail).to.have.property('fieldName', fieldName)
        );
        done();
      });
    });

    it('error details should have only one error (length=1)', (done) => {
      validator('example', wrongData, (err) => {
        const validationDetails = err.details.validationResult;
        expect(validationDetails).to.have.length(1);
        done();
      });
    });

    it('all error details should have fieldName property', (done) => {
      validator('example', wrongData, (err) => {
        const validationDetails = err.details.validationResult;
        const messages = validationDetails.map(detail => detail.message);
        expect(messages).to.contain(errorMessage);
        done();
      });
    });

    it('error should not be an error when validation error', (done) => {
      validator('example', wrongData, (err) => {
        expect(err).to.not.be.equal(null);
        done();
      });
    });

    it('error should be an instance of ValidationError', (done) => {
      validator('example', wrongData, (err) => {
        expect(err).to.be.a(ValidationError);
        done();
      });
    });

    it('error should have a details property', (done) => {
      validator('example', wrongData, (err) => {
        expect(err).to.have.property('details');
        done();
      });
    });

    it('error should have a details property', (done) => {
      validator('example', wrongData, (err) => {
        const details = err.details;
        expect(details).to.have.property('validationResult');
        expect(details.validationResult).to.be.an('array');
        done();
      });
    });

    it('all error details should have check property = false', (done) => {
      validator('example', wrongData, (err) => {
        const validationDetails = err.details.validationResult;
        validationDetails.forEach(detail => expect(detail).to.have.property('check', false));
        done();
      });
    });

    it('value should be null when validation error', (done) => {
      validator('example', wrongData, (err, check) => {
        expect(check).to.be.equal(null);
        done();
      });
    });

    it('error should be null when correct data', (done) => {
      validator('example', correctData, (err) => {
        expect(err).to.be.equal(null);
        done();
      });
    });

    it('value should be null when correct data', (done) => {
      validator('example', correctData, (err, check) => {
        expect(check).to.be.equal(null);
        done();
      });
    });
  });
});
