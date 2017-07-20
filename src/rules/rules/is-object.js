const _isObject = require('lodash.isobject');

const isObject = (options, callback) => {
  const { data, fieldName } = options;
  const notPassing = {
    check: false,
    message: 'error.validate.not-object',
    fieldName,
  };

  try {
    if (!_isObject(data)) {
      throw new Error();
    }
  } catch (ex) {
    return callback(null, notPassing);
  }
  return callback(null, {
    check: true,
  });
};

/**
 * Checks if provided field is object
 * @param {object} options
 * @param {object} options.schema - full chema to validate
 * @param {object} options.data - field value which validator should validate
 * @param {object} options.fieldName - name of the field passed to validate
 * @param {object} options.context - context of the field containing rest of the fields
 * @param {object} options.config - object with validator configuration
 * @param {function} finalCallback - callback which will return result of validation or error
 * @returns {undefined} function does not return value, result is returned via callback provided
 */
module.exports = isObject;
