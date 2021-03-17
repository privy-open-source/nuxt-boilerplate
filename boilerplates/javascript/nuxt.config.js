export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - javascript',
    title: 'javascript',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Runtime config (https://nuxtjs.org/guide/runtime-config)
  publicRuntimeConfig: {
    logoutUrl: process.env.LOGOUT_URL,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/scss/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/axios' },
    { src: '@/plugins/main', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://www.npmjs.com/package/@nuxtjs/sentry
    '@nuxtjs/sentry',
    // https://www.npmjs.com/package/@dcindonesia/nuxt-oauth
    '@dcindonesia/nuxt-oauth',
    // https://github.com/avil13/vue-sweetalert2
    'vue-sweetalert2/nuxt',
  ],

  // Sentry module configuration (https://www.npmjs.com/package/@nuxtjs/sentry)
  sentry: {
    dsn: process.env.SENTRY_URL,
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: { proxy: true },
  proxy: {
    '/api/': {
      target: process.env.API_BASE_URL,
      pathRewrite: { '^/api/': '/' },
    },
  },

  // OAuth module configuration (https://www.npmjs.com/package/@dcindonesia/nuxt-oauth)
  oauth: {
    sessionName: 'mySession',
    authPath: '/admin',
    secretKey: process.env.SECRET_KEY,
    oauthHost: process.env.OAUTH_HOST,
    oauthClientId: process.env.OAUTH_CLIENT_ID,
    oauthClientSecret: process.env.OAUTH_CLIENT_SECRET,
    scopes: ['public', 'personal_identity'],
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: { treeShake: true },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
