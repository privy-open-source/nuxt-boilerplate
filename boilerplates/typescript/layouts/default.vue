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

      <v-app>
        <v-main>
          <nuxt />
        </v-main>
      </v-app>
    </client-only>
  </div>
</template>
