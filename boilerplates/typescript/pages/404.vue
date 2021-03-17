<template>
  <div class="error">
    <div class="error__content">
      <!-- <img src="@/assets/images/404.svg" alt="this is 404" /> -->
      <h2 class="error__status">404 - Not Found</h2>
      <p class="error__description">
        <b>
          We're sorry, but the page you were looking for doesn't exist. This may
          happen, because we always update every content to make it more
          feasible for the visitor.
        </b>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'blank',
  head: { title: '404 - Page Not Found' },
})
</script>
