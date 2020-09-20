module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    'prettier',
  ],
  'rules': {
    'prettier/prettier': ['error', { 'singleQuote': true }],
    "indent": ["error", 2],
    "require-jsdoc" : 0,
    "object-curly-spacing" : 0,
    "comma-dangle": 0
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
};
