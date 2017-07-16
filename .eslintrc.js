module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  env: {
    node: true,
    mocha: true,
    es6: true,
  },
  extends: 'airbnb-base',
  settings: {},
  rules: {
    // 'import/extensions': 'off',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '_keys',
          '_difference',
          '_get',
          '_omit',
          '_filter',
          '_uniqWith',
          '_flatten',
          '_isEqual',
          '_concat',
          '_isString',
        ],
      },
    ],
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always',
        exports: 'always',
        functions: 'ignore',
      },
    ],
  },
  globals: {},
};
