module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    semi: [2, 'never'],
    camelcase: 'off',
    'no-console': 'off',
    'no-lonely-if': 'off',
    'no-prototype-builtins': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-mutating-props': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'prettier/prettier': ['error', { semi: false, endOfLine: 'auto' }],
  },
}
