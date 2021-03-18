<template>
  <div>
    <v-navigation-drawer :value="drawer" app>
      <v-layout class="brand" align-center justify-center>
        <!-- Place your own logo here -->
        <!-- <img class="brand-logo" src="~/assets/images/logo.svg" alt="Logo Mandiri" /> -->
        <span>Logo</span>
      </v-layout>

      <v-list class="list" dense>
        <v-list-item-group :value="menus.activeMenu" color="primary">
          <template v-for="menu in menus.filteredMenu">
            <template v-if="!menu.children">
              <v-list-item
                :key="menu.name"
                :value="menu.name"
                link
                @click="$router.push(menu.url)"
              >
                <v-list-item-action>
                  <v-icon>{{ menu.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ menu.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-else>
              <v-list-group
                :key="menu.name"
                :value="isSubmenuOpen(menu.url)"
                no-action
              >
                <template #activator>
                  <v-list-item-action>
                    <v-icon>{{ menu.icon }}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ menu.name }}</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                  v-for="submenu in menu.children"
                  :key="submenu.name"
                  :value="submenu.name"
                  link
                  @click="$router.push(submenu.url)"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ submenu.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </template>
          </template>
        </v-list-item-group>

        <v-layout v-if="logoutButton === 'bottom'" justify-end class="logout">
          <v-list-item link @click="handleLogout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-layout>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
/**
 * @/menu : Routing configuration. You can find it in `menu/index.js`.
 * @/utils/menu : Routing filter configuration. You can find it in `utils/menu.js`.
 */
import menus from '@/menu'
import { filterMenu } from '@/utils/menu'

export default {
  name: 'Sidebar',
  props: { logoutButton: { type: String, default: 'bottom' } },
  computed: {
    drawer() {
      return this.$store.get('drawer')
    },
    role() {
      return this.$store.get('session/user.roles.0.code')
    },
    menus() {
      return filterMenu(this.role, menus, this.$route.path)
    },
  },
  methods: {
    isSubmenuOpen(url) {
      return this.$route.path.startsWith(url)
    },
    handleLogout() {
      this.$logout('/admin')
      window.location.replace(this.$config.logoutUrl)
    },
  },
}
</script>

<style lang="scss" scoped>
.brand {
  width: 100%;
  height: 64px;
}

.list {
  padding-top: 0;

  .logout {
    padding: 12px 0 12px 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    cursor: pointer;
  }
}
</style>
