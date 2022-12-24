module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  rules: {
    'quotes': ['error', 'single'],
    'require-jsdoc': 'off',
    'guard-for-in': 'off',
    'max-len': ['error', {'code': 120}],
  },
  parserOptions: {
    ecmaVersion: 8,
  },
};
