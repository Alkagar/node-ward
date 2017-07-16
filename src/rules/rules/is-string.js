const _ = require('lodash');

module.exports = (options, callback) => {
  const { data, fieldName } = options;

  if (!_.isString(data)) {
    return callback(null, {
      check: false,
      message: 'error.validate.not-string',
      fieldName,
    });
  }
};
