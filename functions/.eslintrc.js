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
  },
  parserOptions: {
    ecmaVersion: 8,
  },
};
