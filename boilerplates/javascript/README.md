# [DCI] JavaScript

DCI Nuxt JavaScript Boilerplate.

### Prerequisites

1. `Node.js` LTS (12 / 14)
2. `yarn` >= v1.22.4
3. Code Editor. VS Code recommended. [Download here.](https://code.visualstudio.com/)
4. Vetur for VS Code. [Download here.](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
5. Prettier for VS Code. [Download here.](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
6. ESLint for VS Code. [Download here.]()

### What's Inside?

- Nuxt.js
- Vuex (with `vuex-easy-access`)
- Vuetify
- Prettier Lint
- ESLint

### Build Setup

**Don't use `npm`. Use `yarn` instead.**

```bash
# clone this repository
# copy .env.example to .env
$ cp .env.example .env # edit .env config to suit your needs

# install dependencies
$ yarn install

# development (localhost:3000)
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

### Project Directory

```
.
+-- assets/
|   +-- scss/
+-- components/
+-- layouts/
+-- menu/
+-- middleware/
+-- pages/
+-- plugins/
+-- static/
+-- store/
+-- utils/
+-- .prettierrc
+-- .eslintrc.js
+-- Dockerfile
+-- nuxt.config.js
```

`assets/` - Assets

`assets/scss` - SCSS Stylesheet Assets (Using BEM Style)

`components/` - Nuxt.js Components

`layouts/` - Nuxt.js Layouts

`menu/` - Sidebar Menus

`middleware/` - Nuxt.js Middlewares

`pages/` - Nuxt.js Pages

`plugins/` - Nuxt.js Plugins

`static/` - Nuxt.js Static Files (favicon, images)

`store/` - Vuex Store

`utils/` - Nuxt.js Utilities

`.prettierrc` - Prettier Configuration

`.eslintrc.js` - ESLint Configuration

`Dockerfile` - Docker Configuration

`nuxt.config.js` - Nuxt.js Configuration

For detailed explanation on how things work, check out.

- [Nuxt.js docs](https://nuxtjs.org)
- [Vuetify docs](https://vuetifyjs.com/)
- [vuex docs](https://vuex.vuejs.org/guide)
- [vuex-easy-access docs](https://mesqueeb.github.io/vuex-easy-access)
- [ESLint order-in-components docs](https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/order-in-components.md)
