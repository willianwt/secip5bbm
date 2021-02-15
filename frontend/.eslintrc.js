module.exports = {
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: true
    },
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'plugin:react/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'eslint-plugin-html',
    ],
    rules: {
        "react/prefer-stateless-function": "off",
        "react/jsx-filename-extension": "off",
        "max-len": "off",
        "react/no-unescaped-entities": 0,
        "react/display-name": 0,
        "react/prop-types": 0,
        "no-unused-vars": "off",
        "no-array-index-key": "off",
    }
};