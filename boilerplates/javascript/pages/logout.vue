<template>
  <div>
    <v-overlay :value="true" opacity="1" color="#ffffff">
      <v-progress-circular
        indeterminate
        size="35"
        color="#000"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$logout('/admin')
    window.location.replace(this.$config.logoutUrl)
  },
}
</script>
