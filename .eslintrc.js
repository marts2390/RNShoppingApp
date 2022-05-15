module.exports = {
  'env': {
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 13,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'react-native',
  ],
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  'rules': {
    // React
    'react/require-default-props': 0,
    'react/no-unused-prop-types': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
    'react/jsx-props-no-multi-spaces': 2,
    'react/jsx-uses-react': 2,
    'react/react-in-jsx-scope': 2,
    'react/no-unescaped-entities': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-wrap-multilines': ['error', {
      'declaration': 'parens-new-line',
      'assignment': 'parens-new-line',
      'return': 'parens-new-line',
      'arrow': 'parens-new-line',
      'condition': 'parens-new-line',
      'logical': 'parens-new-line',
      'prop': 'parens-new-line'
    }
    ],
    'react/jsx-curly-spacing': [2, 'always'],
    'react/jsx-max-props-per-line': [2, { 'maximum': 1 }],
    'react/jsx-boolean-value': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': ['error', 'always'],
    'react/jsx-key': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-props-no-spreading': 'off',

    // Eslint
    'no-case-declarations': 'off',
    'arrow-body-style': 'off',
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'lines-between-class-members': 'off',
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1 }],
    'object-curly-spacing': ['warn', 'always'],
    'no-irregular-whitespace': ['error', { 'skipComments': true }],
    'no-trailing-spaces': 'error',
    'prefer-destructuring': ['error', { 'object': true, 'array': false }],
    'padding-line-between-statements': [
      'error',
      { 'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*' },
      { 'blankLine': 'any', 'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var'] }
    ],
    'no-unused-vars': [
      'warn',
      {
        'vars': 'all',
        'args': 'none'
      }
    ],
    'max-len': [
      'error',
      {
        'code': 120,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreComments': true
      }
    ],
    'no-plusplus': [
      'error',
      {
        'allowForLoopAfterthoughts': true
      }
    ],

    // Typescript
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/semi': [2, 'never'],
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-expressions': 0,
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/comma-dangle': ['error', {
      'arrays': 'only-multiline',
      'objects': 'only-multiline',
      'imports': 'only-multiline',
      'exports': 'only-multiline',
      'functions': 'never'
    }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        'vars': 'all',
        'args': 'none'
      }
    ],
    '@typescript-eslint/no-explicit-any': [
      'warn',
      {
        'ignoreRestArgs': true
      }
    ],
  }
}
