<template>
  <div class="maintenance">
    <v-row class="maintenance__container">
      <v-col class="block block--text">
        <div class="block__top">
          <h1>Website is under maintenance.</h1>
          <p>
            We’re undergoing a bit of scheduled maintenance, sorry for the
            inconvenience. We’ll be back up and running as fast as possible.
          </p>
        </div>

        <div class="block__bottom">
          <v-row>
            <v-col cols="1" class="icon-warning">
              <img src="/maintenance-warning.svg" alt="maintenance-warning" />
            </v-col>
            <v-col>
              <h2>Definition of “Maintenance Page”</h2>
              <p>
                An inconvenient webpage designed to alert users that something
                has gone amiss with tha page they’re trying to access. Usually,
                these messages are accompanied by a sincere apology from the
                development team for having dropped the ball.
              </p>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col class="block">
        <img src="/maintenance.svg" alt="maintenance" class="img-fluid" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  head: { title: 'Maintenance' },
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins' as m;

.maintenance {
  @include m.element('container') {
    width: 80%;
    height: 100vh;
    margin: 0 auto;
    flex-direction: row;

    @media (max-width: 500px) {
      height: auto;
    }

    @media (max-width: 767px) {
      text-align: center;
      flex-direction: column-reverse;
      width: 100%;
      padding: 30px 20px;

      .icon-warning {
        display: none;
      }
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      .icon-warning {
        display: none;
      }
    }
  }

  .block {
    display: flex;
    align-self: center;

    @include m.element('top') {
      h1 {
        color: #172339;
        line-height: 1em;
        margin-bottom: 1rem;
      }

      p {
        color: #75769a;
        font-size: 12pt;
      }
    }

    @include m.element('bottom') {
      img {
        width: 32px;
      }

      h2 {
        color: #232c3d;
        font-size: 16pt;
        margin-bottom: 12px;
      }

      p {
        color: #4d6191;
        font-size: 12pt;
      }
    }

    @include m.modifier('text') {
      display: block;
    }

    .img-fluid {
      width: 100%;
    }
  }
}
</style>
