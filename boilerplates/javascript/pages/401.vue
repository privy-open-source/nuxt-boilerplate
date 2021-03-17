<template>
  <div class="error">
    <div class="error__content">
      <v-img src="401.svg" alt="401" />
      <h2 class="error__status">401 - Unauthorized</h2>
      <p class="error__description">
        <b>
          We're sorry, but the page you were looking for is require logging in.
          <br />
          <br />
          Ask your project maintainers for adding your PrivyID to this project.
        </b>
      </p>
      <p class="error__helper">Already have an account?</p>
      <v-btn dark depressed @click="$login()">Login</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  middleware: ['authenticated'],
  head: { title: '401 Unauthorized' },
}
</script>
