const expect = require('expect.js');
const ward = require('../src/index.js');

module.exports = (x = {}) => {
  const correctData = x.correctData || '';
  const wrongData = x.wrongData || '';
  const errorMessage = x.errorMessage || 'error.no-error-message';
  const validatorName = x.validatorName || 'error.unknown-validator';

  describe('Single:: Async::', () => {
    describe(`${validatorName}::`, () => {
      it('all error details should have empty fieldName property', (done) => {
        ward.validateDataAsync(x.schema, wrongData, (err, validationResult) => {
          const validationDetails = validationResult.details.validationResult;
          validationDetails.forEach(detail => expect(detail).to.have.property('fieldName', null));
          done();
        });
      });

      it('error details should have only one error (length=1)', (done) => {
        ward.validateDataAsync(x.schema, wrongData, (err, validationResult) => {
          const validationDetails = validationResult.details.validationResult;
          expect(validationDetails).to.have.length(1);
          done();
        });
      });

      it('error should match validator message', (done) => {
        ward.validateDataAsync(x.schema, wrongData, (err, validationResult) => {
          const validationDetails = validationResult.details.validationResult;
          const messages = validationDetails.map(detail => detail.message);
          expect(messages).to.contain(errorMessage);
          done();
        });
      });

      it('should return null when no validation results', (done) => {
        ward.validateDataAsync(x.schema, correctData, (err, validationResult) => {
          expect(validationResult).to.be.equal(null);
          done();
        });
      });

      it('details should be an array when some errors', (done) => {
        ward.validateDataAsync(x.schema, wrongData, (err, validationResult) => {
          const validationDetails = validationResult.details.validationResult;
          expect(validationDetails).to.be.an('array');
          done();
        });
      });

      it('all element sof details should have check property', (done) => {
        ward.validateDataAsync(x.schema, wrongData, (err, validationResult) => {
          const validationDetails = validationResult.details.validationResult;
          validationDetails.forEach(detail => expect(detail).to.have.property('check', false));
          done();
        });
      });
    });
  });
};
