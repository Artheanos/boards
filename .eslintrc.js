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
        'indent': ['error', 4],
        'object-curly-spacing': ['error', 'always'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
        'space-before-function-paren': ['error', 'never'],
        'prefer-const': 'error',
    },
}
