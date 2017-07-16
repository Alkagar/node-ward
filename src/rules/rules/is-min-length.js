const _ = require('lodash');

module.exports = (options, callback) => {
  const { schema, data, config, fieldName } = options;

  if (!_.isString(data)) {
    return callback(null, {
      check: false,
      message: 'error.validate.not-string',
      fieldName,
    });
  }
  const length = data.length;
  if (length < config.v) {
    return callback(null, {
      check: false,
      message: 'error.validate.not-min',
      config: config.v,
      fieldName,
    });
  }
  return callback(null, {
    check: true,
  });
};
