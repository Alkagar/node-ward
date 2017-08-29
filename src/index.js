const _filter = require('lodash.filter');
const _flattenDeep = require('lodash.flattendeep');

const ValidationError = require('./errors/validation.js');
const validate = require('./validate.js');
const ERROR_MESSAGES = require('./error-messages.js');

const rules = require('./rules/rules.js');

const getSchemaValidator = (schemas, customRules = {}) => {
  const allRules = Object.assign({}, rules, customRules);
  const noSchemaError = new ValidationError(ERROR_MESSAGES.NO_SCHEMA);

  return (schemaName, dataToValidate, callback) => {
    const schema = schemas[schemaName];
    if (!schema) {
      return callback(noSchemaError, null);
    }

    return validate(schema, allRules, dataToValidate, (err, validationResult) => {
      const realErrors = _filter(validationResult, error => !error.check);

      if (realErrors.length > 0) {
        return callback(
          new ValidationError(ERROR_MESSAGES.VALIDATION, {
            validationResult: realErrors,
          }),
          null
        );
      }
      return callback(null, null);
    });
  };
};

const validateDataSync = (ruleDef = [], data) => {
  if (Array.isArray(ruleDef)) {
    const results = ruleDef.map((rule) => {
      if (typeof rule.n === 'string') {
        if (!rules[rule.n]) {
          return {
            check: false,
            message: 'error.validate.not-existing-rule',
            rule,
          };
        }
        return rules[rule.n].sync({
          data,
          config: rule,
          fieldName: null,
          context: null,
          schema: null,
        });
      }
      return {
        check: false,
        message: 'error.validate.rule-name-is-not-a-string',
        rule,
      };
    });
    const realErrors = _flattenDeep(results).filter(result => !result.check);
    if (realErrors.length > 0) {
      return new ValidationError(ERROR_MESSAGES.VALIDATION, {
        validationResult: realErrors,
      });
    }
    return null;
  } else {
    throw new Error('error.validate.rule-definition-must-be-an-array');
  }
};

const validateDataAsync = (rule, data, callback) => callback(null, validateDataSync(rule, data));

/**
 * Return function to validate data against provided schemas
 * @param {object} schemas - object with all schema defined like:
 *                 {
 *                    postUser : { name: [ {n: 'isString'}, {n: 'isMaxLength', v: 34} ],
 *                                 pass: [ {n: 'isString'}, {n: 'isMinLength', v: 10} ] },
 *                    patchUser : { name: [ {n: 'isString'}, {n: 'isMaxLength', v: 34} ] },
 *                 },
 *                 Now validator can be invoked with two different schemas 'postUser' or
 *                 'patchUser', validating differently for two different scenarios in your
 *                 application.
 * @param {object} customRules - object with custom application rules to use, example:
 *                 {
 *                    isEmailUnique: function(options, callback) { ... },
 *                    isUserAgeCorrect: function(options, callback) { ... },
 *                 }
 *                 Validators functions should work exactly like validators in library taking all
 *                 the same arguments.
 * @returns {function} - validator function(schemaName, dataToValidate, callback) with all available
 *                       schemas.
 */
module.exports.getSchemaValidator = getSchemaValidator;

module.exports.validateDataSync = validateDataSync;
module.exports.validateDataAsync = validateDataAsync;
