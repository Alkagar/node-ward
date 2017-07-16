const _keys = require('lodash.keys');
const _omit = require('lodash.omit');
const _difference = require('lodash.difference');

/**
 * Check if in object are unknown properties
 * @param {object} options
 * @param {object} options.schema - full chema to validate
 * @param {object} options.data - object which validator should validate
 * @param {object} options.config - object with validator configuration
 */
module.exports = (options, callback) => {
  const { schema, data } = options;

  const dataKeys = _keys(_omit(data, ['_']));
  const schemaKeys = _keys(_omit(schema, ['_']));
  const unknown = _difference(dataKeys, schemaKeys);

  if (unknown.length > 0) {
    return callback(null, {
      check: false,
      message: 'error.validate.unknown-properties',
      details: unknown,
    });
  }
  return callback(null, {
    check: true,
  });
};
