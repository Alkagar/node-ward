const expect = require('expect.js');

const ward = require('../src/index.js');
const ValidationError = require('../src/errors/validation.js');

module.exports = (x = {}) => {
  const correctData = x.correctData || {};
  const wrongData = x.wrongData || {};
  const fieldName = x.fieldName || 'error.no-field-name';
  const errorMessage = x.errorMessage || 'error.no-error-message';
  const validatorName = x.validatorName || 'error.unknown-validator';

  const validator = ward.getSchemaValidator({
    example: {
      [fieldName]: x.schema || [],
    },
  });
  describe(`${validatorName}::`, () => {
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
};
