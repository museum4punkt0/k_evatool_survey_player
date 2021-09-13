module.exports = {
    root: true,

    env: {
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2020,
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/no-unused-components': 'off',
        'vue/no-v-html': 'off',
        'vue/no-deprecated-filter': 'off',
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/prettier',
    ],
}
