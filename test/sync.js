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
  // has One Lower Letter
  describe('hasOneLower::', () => {
    it('should return null when validation passed', () => {
      const validationResult = ward.validateDataSync([{ n: 'hasOneLower' }], 'PassWORD123');
      expect(validationResult).to.be.equal(null);
    });
    it('should have .details.check === false if validation failed', () => {
      const validationResult = ward.validateDataSync([{ n: 'hasOneLower' }], 'PASSWORD123');
      const validationDetails = validationResult.details.validationResult;
      expect(validationDetails).to.be.an('array');
      expect(validationDetails).to.have.length(1);
      const hasOneLowerError = validationDetails.pop();
      expect(hasOneLowerError.check).to.be.equal(false);
    });
    it('should have .details.message === "error.validate.has-one-lower" if validation failed', () => {
      const validationResult = ward.validateDataSync([{ n: 'hasOneLower' }], 'PASSWORD123');
      const validationDetails = validationResult.details.validationResult;
      expect(validationDetails).to.be.an('array');
      expect(validationDetails).to.have.length(1);
      const hasOneLowerError = validationDetails.pop();
      expect(hasOneLowerError.message).to.be.equal('error.validate.has-one-lower');
    });
  });
  // has One Upper Letter
  describe('hasOneUpper::', () => {
    it('should return null when validation passed', () => {
      const validationResult = ward.validateDataSync([{ n: 'hasOneUpper' }], 'passWOrd');
      expect(validationResult).to.be.equal(null);
    });
    it('should have .details.check === false if validation failed', () => {
      const validationResult = ward.validateDataSync([{ n: 'hasOneUpper' }], 'password123');
      const validationDetails = validationResult.details.validationResult;
      expect(validationDetails).to.be.an('array');
      expect(validationDetails).to.have.length(1);
      const hasOneUpperError = validationDetails.pop();
      expect(hasOneUpperError.check).to.be.equal(false);
    });
    it('should have .details.message === "error.validate.has-one-upper" if validation failed', () => {
      const validationResult = ward.validateDataSync([{ n: 'hasOneUpper' }], 'password123');
      const validationDetails = validationResult.details.validationResult;
      expect(validationDetails).to.be.an('array');
      expect(validationDetails).to.have.length(1);
      const hasOneUpperError = validationDetails.pop();
      expect(hasOneUpperError.message).to.be.equal('error.validate.has-one-upper');
    });
  });
  // has One Digit
  describe('hasOneDigit::', () => {
    it('should return null when validation passed', () => {
      const validationResult = ward.validateDataSync([{ n: 'hasOneDigit' }], 'password123');
      expect(validationResult).to.be.equal(null);
    });
    it('should have .details.check === false if validation failed', () => {
      const validationResult = ward.validateDataSync([{ n: 'hasOneDigit' }], 'passWOrd');
      const validationDetails = validationResult.details.validationResult;
      expect(validationDetails).to.be.an('array');
      expect(validationDetails).to.have.length(1);
      const hasOneDigitError = validationDetails.pop();
      expect(hasOneDigitError.check).to.be.equal(false);
    });
    it('should have .details.message === "error.validate.has-one-digit" if validation failed', () => {
      const validationResult = ward.validateDataSync([{ n: 'hasOneDigit' }], 'passWOrdxD');
      const validationDetails = validationResult.details.validationResult;
      expect(validationDetails).to.be.an('array');
      expect(validationDetails).to.have.length(1);
      const hasOneDigitError = validationDetails.pop();
      expect(hasOneDigitError.message).to.be.equal('error.validate.has-one-digit');
    });
  });
  // has One working in conjunction
  describe('hasOneDigit + hasOneUpper + hasOneLower::', () => {
    it('should return null when validation passed', () => {
      const validationResult = ward.validateDataSync([
        { n: 'hasOneDigit' },
        { n: 'hasOneUpper' },
        { n: 'hasOneLower' },
      ], 'passWord123');
      expect(validationResult).to.be.equal(null);
    });
    it('should have all validators .details.check === false if validation failed', () => {
      const validationResult = ward.validateDataSync([
        { n: 'hasOneDigit' },
        { n: 'hasOneUpper' },
        { n: 'hasOneLower' },
      ], 'password');
      const validationDetails = validationResult.details.validationResult;
      expect(validationDetails).to.be.an('array');
      expect(validationDetails).to.have.length(2);
      validationDetails.forEach(detail => expect(detail).to.have.property('check', false));
    });
  });
});
