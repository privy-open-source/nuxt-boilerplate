<template>
  <div>
    <v-app-bar app elevation="1" color="white" dark>
      <v-app-bar-nav-icon
        color="#003d79"
        @click.stop="$store.set('setDrawer', !drawer)"
      ></v-app-bar-nav-icon>

      <template v-if="logoutButton === 'bottom'">
        <v-layout class="userinfo" justify-end>
          <div class="userinfo__container">
            <v-avatar class="userinfo__container--avatar" size="40" tile>
              <span>{{ user.name | getFirstChar }}</span>
            </v-avatar>
          </div>
          <div class="mt-3">
            <p class="userinfo__name">{{ user.name }}</p>
            <p class="userinfo__role">{{ user.roles[0].name }}</p>
          </div>
        </v-layout>
      </template>

      <template v-else-if="logoutButton === 'top'">
        <v-spacer />
        <v-list color="transparent">
          <v-menu bottom offset-y>
            <template #activator="{ on, attrs }">
              <v-list-item link style="padding: 0" v-bind="attrs" v-on="on">
                <div class="userinfo d-flex justify-content-end">
                  <div class="userinfo__container">
                    <v-avatar
                      class="userinfo__container--avatar"
                      size="40"
                      rounded
                    >
                      <span class="white--text">
                        {{ user.name | getFirstChar }}
                      </span>
                    </v-avatar>
                  </div>
                  <div class="mt-3">
                    <p class="userinfo__name">{{ user.name }}</p>
                    <p class="userinfo__role">{{ user.roles[0].name }}</p>
                  </div>
                </div>
                <v-list-item-action>
                  <v-icon color="#333333">mdi-chevron-down</v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>

            <v-list dense>
              <v-list-item link @click="handleLogout">
                <v-list-item-icon>
                  <v-icon color="#16347a">mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="switch__logout">
                  Logout
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  filters: {
    /**
     * Get first character from user's firstname & middlename / lastname.
     */
    getFirstChar(char) {
      let returnChar = ''

      if (char !== '') {
        const splitChar = char.split(' ')
        if (splitChar.length === 1) {
          returnChar = splitChar[0][0]
        } else if (splitChar.length > 1) {
          returnChar = `${splitChar[0][0]}${splitChar[1][0]}`
        } else {
          returnChar = ''
        }
      } else {
        returnChar = ''
      }

      return returnChar
    },
  },
  props: { logoutButton: { type: String, default: 'bottom' } },
  computed: {
    drawer() {
      return this.$store.get('drawer')
    },
    user() {
      return this.$store.get('session/user')
    },
  },
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts/mixins' as m;
/*
If you don't need a global css, please don't add css in `assets` folder.
Use this method instead, with `scoped` props.
*/
.userinfo {
  width: 100%;

  @include m.element('container') {
    border-left: 1px solid #e6e6e6;
    padding: 10px;

    @include m.modifier('avatar') {
      background: linear-gradient(
        104deg,
        rgb(61, 141, 233) 0%,
        rgb(119, 194, 238) 35%,
        rgb(6, 90, 185) 100%
      );
      border-radius: 8px;
    }
  }

  @include m.element('name') {
    margin-bottom: 0;
    font-size: 14px;
    color: #333333;
    font-weight: bold;
  }

  @include m.element('role') {
    margin-bottom: 0;
    font-size: 10px;
    color: #828282;
  }
}
</style>
