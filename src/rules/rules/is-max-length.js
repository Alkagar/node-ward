const async = require('async');

const isString = require('./is-string.js');

const isMaxLength = (options, callback) => {
  const { data, config, fieldName } = options;
  const notPassing = {
    check: false,
    message: 'error.validate.not-max',
    config: config.v,
    fieldName,
  };

  try {
    const length = data.length;
    if (length > config.v) {
      return callback(null, notPassing);
    }
  } catch (ex) {
    return callback(null, notPassing);
  }

  return callback(null, {
    check: true,
  });
};

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
module.exports = (options, finalCallback) => {
  async.parallel(
    [callback => isString(options, callback), callback => isMaxLength(options, callback)],
    (err, validationResults) => {
      if (err) {
        return finalCallback(err, null);
      }
      return finalCallback(null, validationResults);
    }
  );
};
