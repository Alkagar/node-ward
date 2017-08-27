const _isString = require('lodash.isstring');

const isString = (options) => {
  const { data, fieldName } = options;

  if (!_isString(data)) {
    return {
      check: false,
      message: 'error.validate.not-string',
      fieldName,
    };
  }
  return {
    check: true,
  };
};

const sync = options => [isString(options)];
const async = (options, callback) => callback(null, sync(options));

/**
 * Checks if provided field is correct email address.
 * @param {object} options
 * @param {object} options.schema - full chema to validate
 * @param {object} options.data - field value which validator should validate
 * @param {object} options.fieldName - name of the field passed to validate
 * @param {object} options.context - context of the field containing rest of the fields
 * @param {object} options.config - object with validator configuration
 * @param {function} finalCallback - callback which will return result of validation or error
 * @returns {undefined} function does not return value, result is returned via callback provided
 */
module.exports.async = async;
module.exports.sync = sync;
