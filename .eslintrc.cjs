module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // Dành cho React 17+ (không cần import)
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } }, // Tự động phát hiện React 18
  plugins: ['react', 'react-hooks', 'react-refresh'],
  rules: {
    // react
    'react-refresh/only-export-components': 'warn',
    'react/prop-types': 0,
    'react/display-name': 0,
    //MUI
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*']
      }
    ],
    //common
    'no-console': 1,
    'no-lonely-if': 1,
    'no-unused-vars': 1
  }
}
