<template>
  <div class="landing">
    <browser-not-supported v-if="!supported" />

    <div v-if="supported">
      <div class="navbar navbar--home elevation-1">
        <div class="d-flex m-auto">
          <!-- Insert your logo here -->
          <!-- <img height="35" src="@/assets/images/logo.svg" alt="logo" /> -->
          Logo
        </div>
      </div>

      <div class="px-5 pt-3">
        <input-camera
          name="image"
          label="Ambil Foto"
          :disabled="loading"
          @change="image = $event"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { detect } from 'detect-browser'
import BrowserNotSupported from '@/components/BrowserNotSupported.vue'
import InputCamera from '@/components/Form/InputCamera.vue'

export default Vue.extend({
  components: { BrowserNotSupported, InputCamera },
  data() {
    return {
      supported: false,
      loading: false,
      image: null,
    }
  },
  mounted() {
    this.checkBrowser()
  },
  methods: {
    checkBrowser() {
      const browser = detect()
      const allowed = ['iOS', 'Android OS', 'BlackBerry OS', 'Windows Mobile']
      const magic = this.$route.query.magicWord

      if (
        !allowed.includes(String(browser?.os)) &&
        typeof magic === 'undefined'
      ) {
        this.supported = false
      } else {
        this.supported = true
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins' as m;

.navbar {
  display: flex;
  align-items: center;
  justify-content: center;

  @include m.modifier('home') {
    background-color: white;
    position: relative;
    height: 63px;
    display: flex;
  }
}
</style>
