const _isString = require('lodash.isstring');

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
  const { data, config, fieldName } = options;
  if (!_isString(data)) {
    return finalCallback(null, {
      check: false,
      message: 'error.validate.not-string',
      fieldName,
    });
  }
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmail = re.test(data);

  if (!isEmail) {
    return finalCallback(null, {
      check: false,
      message: 'error.validate.is-not-email',
      config: config.v,
      fieldName,
    });
  }
  return finalCallback(null, {
    check: true,
  });
};
