const uuid = require('uuid/v4');

function ValidationError(message, details = {}, hiddenDetails = {}) {
  this.uuid = uuid();
  this.name = 'ValidationError';
  this.message = message || 'error.validation';
  this.hiddenDetails = hiddenDetails;
  this.details = details;
  this.stack = new Error().stack;
}

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

module.exports = ValidationError;
