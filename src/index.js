const _filter = require('lodash.filter');

const ValidationError = require('./errors/validation.js');
const validate = require('./validate.js');

const getValidator = schemas => (schemaName, dataToValidate, callback) => {
  const schema = schemas[schemaName];
  if (!schema) {
    return callback(new ValidationError('error.validation.no-schema-defined'), null);
  }

  return validate(schema, dataToValidate, (err, validationResult) => {
    const realErrors = _filter(validationResult, error => !error.check);

    if (realErrors.length > 0) {
      return callback(
        new ValidationError('error.validation', {
          validationResult: realErrors,
        }),
        null
      );
    }
    return callback(null, null);
  });
};

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
 * @returns {function} - validator function(schemaName, dataToValidate, callback) with all available
 *                       schemas.
 */
module.exports = getValidator;
