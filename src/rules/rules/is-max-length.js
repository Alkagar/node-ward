const _ = require('lodash');
const isString = require('./is-string.js');

module.exports = (options, callback) => {
  const { schema, data, config, fieldName } = options;

  if(isString(options, () => {
    if(err) {

    }
  }));

  if (!_.isString(data)) {
    return callback(null, {
      check: false,
      message: 'error.validate.not-string',
      fieldName,
    });
  }

  const length = data.length;
  if (length > config.v) {
    return callback(null, {
      check: false,
      message: 'error.validate.not-max',
      config: config.v,
      fieldName,
    });
  }
  return callback(null, {
    check: true,
  });
};
