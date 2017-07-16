const isObject = require('./rules/is-object.js');
const isMinLength = require('./rules/is-min-length.js');
const isMaxLength = require('./rules/is-max-length.js');
const isRequired = require('./rules/is-required.js');
const allowUnknown = require('./rules/allow-unknown.js');
const isEmail = require('./rules/is-email.js');

module.exports = {
  isObject,
  isMinLength,
  isMaxLength,
  isRequired,
  allowUnknown,
  isEmail,
};
