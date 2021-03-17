<template>
  <div>
    <client-only>
      <v-overlay slot="placeholder" :value="true" opacity="1" color="#ffffff">
        <v-progress-circular
          indeterminate
          size="35"
          color="#000"
        ></v-progress-circular>
      </v-overlay>

      <notifications position="top right" />

      <v-app>
        <Sidebar :logout-button="logoutButton" />
        <Header :logout-button="logoutButton" />

        <v-main class="dashboard">
          <v-container>
            <nuxt />
          </v-container>
        </v-main>
      </v-app>
    </client-only>
  </div>
</template>

<script>
// Components
import Sidebar from '@/components/Layout/Sidebar'
import Header from '@/components/Layout/Header'

export default {
  /**
   * Authentication middleware.
   * If you're logged off, it will automatically redirect to `dci-auth` or `account-dcindonesia` login page.
   */
  components: { Sidebar, Header },
  middleware: ['authenticated'],
  data() {
    return {
      logoutButton: 'top',
    }
  },
}
</script>
