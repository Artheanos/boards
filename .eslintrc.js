module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'jest',
    ],
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        'object-curly-spacing': ['error', 'always'],
        'semi': ['error', 'never'],
        'space-before-function-paren': ['error', 'never'],
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
    },
}
