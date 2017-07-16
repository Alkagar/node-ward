const _ = require('lodash');


module.exports = (options, callback) => {
  const { schema, data, config, fieldName } = options;
  callback(null, _.isObjectLike(data));
};
