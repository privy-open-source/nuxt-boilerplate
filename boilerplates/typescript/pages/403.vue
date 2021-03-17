<template>
  <div class="error">
    <div class="error__content">
      <v-img src="403.svg" alt="403" />
      <h2 class="error__status">403 - Forbidden</h2>
      <p class="error__description">
        <b>We're sorry, but the page you were looking are forbidden.</b>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'blank',
  head: { title: '403 Forbidden' },
})
</script>
