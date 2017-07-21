const async = require('async');
const _get = require('lodash.get');
const _keys = require('lodash.keys');
const _uniqWith = require('lodash.uniqwith');
const _omit = require('lodash.omit');
const _flattenDeep = require('lodash.flattendeep');
const _isEqual = require('lodash.isequal');
const _concat = require('lodash.concat');

const checkRule = ({ rules, fieldValue, dataToValidate, schema, fieldName }) => (
  ruleDef,
  finalCallback
) => {
  const rule = rules[ruleDef.n];
  if (rule) {
    rule(
      {
        data: fieldValue,
        schema,
        config: ruleDef,
        fieldName,
        context: dataToValidate,
      },
      finalCallback
    );
  } else {
    finalCallback(null, {
      check: false,
      message: 'error.validate.not-existing-rule',
      rule: ruleDef.n,
    });
  }
};

const checkField = ({ rules, dataToValidate, schema }) => (fieldName, callback) => {
  const fieldValue = _get(dataToValidate, fieldName);
  const fieldRules = _get(schema, fieldName, []);
  async.mapSeries(
    fieldRules,
    checkRule({
      rules,
      fieldName,
      fieldValue,
      dataToValidate,
      schema,
    }),
    callback
  );
};

const fieldsValidation = (x = {}, finalCallback) => {
  const { rules, fieldSchema, dataToValidate, schema } = x;
  const keys = _keys(fieldSchema);
  async.mapSeries(
    keys,
    checkField({
      rules,
      dataToValidate,
      schema,
    }),
    (err, result) => {
      const flattenedErrors = _uniqWith(_flattenDeep(result, 2), _isEqual);
      finalCallback(null, flattenedErrors);
    }
  );
};

const generalValidation = (x = {}, finalCallback) => {
  const { rules, general, dataToValidate, schema } = x;
  async.mapSeries(
    general,
    (ruleDef, callback) => {
      const rule = rules[ruleDef.n];
      if (rule) {
        rule(
          {
            data: dataToValidate,
            schema,
            config: ruleDef,
          },
          callback
        );
      } else {
        callback(null, { check: false, message: 'error.validate.not-existing-rule' });
      }
    },
    (err, result) => {
      const flattenedErrors = _uniqWith(_flattenDeep(result, 2), _isEqual);
      finalCallback(null, flattenedErrors);
    }
  );
};

const validate = (schema, rules, dataToValidate, finalCallback) => {
  const general = schema._;
  const fieldSchema = _omit(schema, ['_']);

  async.auto(
    {
      rules: callback => callback(null, rules),
      general: callback => callback(null, general),
      dataToValidate: callback => callback(null, dataToValidate),
      schema: callback => callback(null, schema),
      fieldSchema: callback => callback(null, fieldSchema),
      generalValidation: [
        'rules',
        'general',
        'dataToValidate',
        'schema',
        'fieldSchema',
        generalValidation,
      ],
      fieldsValidation: ['general', 'dataToValidate', 'schema', 'fieldSchema', fieldsValidation],
    },
    (err, result) => {
      if (err) {
        return finalCallback(err, null);
      }
      const allErrors = _concat(result.generalValidation, result.fieldsValidation);
      return finalCallback(null, allErrors);
    }
  );
};

/**
 * Validate provided data agains provided schema.
 * @param {object} schema - schema definition agains which data should be validated
 * @param {object} dataToValidate - data which should be validated
 * @param {function} finalCallback - callback which will return result of validation or error
 * @returns {undefined} function does not return value, result is returned via callback provided
*/
module.exports = validate;
