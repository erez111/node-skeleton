module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
        moduleDirectory: [
          'node_modules',
          '/',
        ],
      },
    },
  },
  rules: {
    'max-len': [2, { code: 160 }],
    'no-undef': 'off', // Problem caused by exporting interfaces, that made errors
    'no-prototype-builtins': 'off', // Avoid errors using hasOwnProperty
    'no-use-before-define': 'off', // Cancel errors when calls functions before declaration
    'no-unused-vars': 'off', // Cancel, since it make errors for functions with un-used variables
    'no-return-await': 'off', // Currently disabled, since sometimes we have redundancy of using "await"
    'linebreak-style': 'off', // Ignore whether new lines are linux made or windows made
    'class-methods-use-this': 'off', // Cancel class not-static methods to be forced to have at least 1 this, otherwise
    'no-plusplus': 'off', // We want to allow usage of ++ (instead of +1)
    'no-param-reassign': 'off', // Allow to reassign object params
    'no-case-declarations': 'off', // Allow declaration within some scopes, e.g: switch=>case
    'object-shorthand': 'off', // No need for shortcuts, such as for function with input "db": "{db: db}" => {db}
    'no-useless-catch': 'off', // Allow useless catch methods (for example, with "throw err" as block content)
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
