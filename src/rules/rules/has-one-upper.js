const isString = require('./is-string.js');

const hasOneUpper = (options) => {
  const { data, fieldName } = options;
  const re = /[A-Z]/;
  const valid = re.test(data);

  if (!valid) {
    return {
      check: false,
      message: 'error.validate.has-one-upper',
      fieldName,
    };
  }

  return {
    check: true,
  };
};

const sync = options => [isString.sync(options), hasOneUpper(options)];
const async = (options, callback) => callback(null, sync(options));

/**
 * Checks if provided string has min one lower caracter
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
