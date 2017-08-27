const isString = require('./is-string.js');

const isEmail = (options) => {
  const { data, fieldName } = options;
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validEmail = re.test(data);

  if (!validEmail) {
    return {
      check: false,
      message: 'error.validate.is-not-email',
      fieldName,
    };
  }
  return {
    check: true,
  };
};

const sync = options => [isString.sync(options), isEmail(options)];

const async = (options, callback) => callback(null, sync(options));

/**
 * Checks if provided field is correct email address.
 * @param {object} options
 * @param {object} options.schema - full schema to validate
 * @param {object} options.data - field value which validator should validate
 * @param {object} options.fieldName - name of the field passed to validate
 * @param {object} options.context - context of the field containing rest of the fields
 * @param {object} options.config - object with validator configuration
 * @param {function} finalCallback - callback which will return result of validation or error
 * @returns {undefined} function does not return value, result is returned via callback provided
 */
module.exports.async = async;
module.exports.sync = sync;
