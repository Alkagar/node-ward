const isObject = require('./rules/is-object.js');
const isMinLength = require('./rules/is-min-length.js');
const isMaxLength = require('./rules/is-max-length.js');
const isRequired = require('./rules/is-required.js');
const allowUnknown = require('./rules/allow-unknown.js');
const isEmail = require('./rules/is-email.js');
const isString = require('./rules/is-string.js');
const hasOneLower = require('./rules/has-one-lower.js');
const hasOneUpper = require('./rules/has-one-upper.js');
const hasOneDigit = require('./rules/has-one-digit.js');

module.exports = {
  isString,
  isObject,
  isMinLength,
  isMaxLength,
  isRequired,
  allowUnknown,
  isEmail,
  hasOneLower,
  hasOneUpper,
  hasOneDigit,
};
