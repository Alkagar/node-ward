const _ = require('lodash');

module.exports = (options, callback) => {
  const { schema, data, config, fieldName } = options;

  if (_.isUndefined(data)) {
    return callback(null, {
      check: false,
      message: 'error.validate.is-required',
      fieldName,
    });
  }
  return callback(null, {
    check: true,
  });
};
