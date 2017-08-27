const expect = require('expect.js');
const ward = require('../src/index.js');

describe('Validators:: Single:: Sync::', () => {
  describe('isEmail::', () => {
    it('all error details should have empty fieldName property', () => {
      const validationResult = ward.validateDataSync([{ n: 'isEmail' }], 'not-email-this-is');
      const validationDetails = validationResult.details.validationResult;
      validationDetails.forEach(detail => expect(detail).to.have.property('fieldName', null));
    });

    it('error details should have only one error (length=1)', () => {
      const validationResult = ward.validateDataSync([{ n: 'isEmail' }], 'not-email-this-is');
      const validationDetails = validationResult.details.validationResult;
      expect(validationDetails).to.have.length(1);
    });

    it('error should match validator message', () => {
      const validationResult = ward.validateDataSync([{ n: 'isEmail' }], 'not-email-this-is');
      const validationDetails = validationResult.details.validationResult;
      const messages = validationDetails.map(detail => detail.message);
      expect(messages).to.contain('error.validate.is-not-email');
    });

    it('should return null when no validation results', () => {
      const validationResult = ward.validateDataSync([{ n: 'isEmail' }], 'john@example.com');
      expect(validationResult).to.be.equal(null);
    });
    
    it('details should be an array when some errors', () => {
      const validationResult = ward.validateDataSync([{ n: 'isEmail' }], 'not-email-this-is');
      const validationDetails = validationResult.details.validationResult;
      expect(validationDetails).to.be.an('array');
    });
    
    it('all element sof details should have check property', () => {
      const validationResult = ward.validateDataSync([{ n: 'isEmail' }], 'not-email-this-is');
      const validationDetails = validationResult.details.validationResult;
      validationDetails.forEach(detail => expect(detail).to.have.property('check', false));
    });
  });
});
