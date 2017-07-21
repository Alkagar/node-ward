const expect = require('expect.js');
const getValidator = require('../src/index.js');
const genericTests = require('./generic-tests.js');

const validator = getValidator({
  example: {
    email: [{ n: 'isEmail' }, { n: 'isRequired' }],
  },
});

describe('Validators::Generic Tests::', () => {
  genericTests({
    validatorName: 'email',
    schema: [{ n: 'isEmail' }, { n: 'isRequired' }],
    correctData: { email: 'john@example.com' },
    wrongData: { email: 'not-email' },
    fieldName: 'email',
    errorMessage: 'error.validate.is-not-email',
  });
  genericTests({
    validatorName: 'isMaxLength',
    schema: [{ n: 'isMaxLength', v: 6 }, { n: 'isRequired' }],
    correctData: { name: 'John' },
    wrongData: { name: 'JohnJohn' },
    fieldName: 'name',
    errorMessage: 'error.validate.not-max',
  });
  genericTests({
    validatorName: 'isMinLength',
    schema: [{ n: 'isMinLength', v: 6 }, { n: 'isRequired' }],
    correctData: { name: 'Johnathan' },
    wrongData: { name: 'John' },
    fieldName: 'name',
    errorMessage: 'error.validate.not-min',
  });
  genericTests({
    validatorName: 'isString - text object',
    schema: [{ n: 'isString' }, { n: 'isRequired' }],
    correctData: { name: 'test-this-string' },
    wrongData: { name: {} },
    fieldName: 'name',
    errorMessage: 'error.validate.not-string',
  });
  genericTests({
    validatorName: 'isString - test array',
    schema: [{ n: 'isString' }, { n: 'isRequired' }],
    correctData: { name: 'test-this-string' },
    wrongData: { name: [] },
    fieldName: 'name',
    errorMessage: 'error.validate.not-string',
  });
  genericTests({
    validatorName: 'isString - test number',
    schema: [{ n: 'isString' }, { n: 'isRequired' }],
    correctData: { name: 'test-this-string' },
    wrongData: { name: 3 },
    fieldName: 'name',
    errorMessage: 'error.validate.not-string',
  });
  genericTests({
    validatorName: 'isObject',
    schema: [{ n: 'isObject' }, { n: 'isRequired' }],
    correctData: { name: {} },
    wrongData: { name: 'string' },
    fieldName: 'name',
    errorMessage: 'error.validate.not-object',
  });
  genericTests({
    validatorName: 'isRequired',
    schema: [{ n: 'isRequired' }],
    correctData: { name: 'any-value' },
    wrongData: { otherName: 'string' },
    fieldName: 'name',
    errorMessage: 'error.validate.is-required',
  });
});

describe('Validators::Custom Tests::', () => {
  describe('isEmail::', () => {
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
});

require('./schemas.js');
