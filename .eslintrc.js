module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['plugin:prettier/recommended', 'eslint:recommended'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
    },
}
