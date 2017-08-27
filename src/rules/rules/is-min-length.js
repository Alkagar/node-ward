const isString = require('./is-string.js');

const isMinLength = options => {
  const { data, config, fieldName } = options;
  const notPassing = {
    check: false,
    message: 'error.validate.not-min',
    config: config.v,
    fieldName,
  };

  try {
    const length = data.length;
    if (length < config.v) {
      return notPassing;
    }
  } catch (ex) {
    return notPassing;
  }

  return {
    check: true,
  };
};

const sync = options => [isString.sync(options), isMinLength(options)];
const async = (options, callback) => callback(null, sync(options));

/**
 * Checks if provided string has min length
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
