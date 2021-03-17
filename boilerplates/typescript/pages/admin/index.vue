<template>
  <v-container fluid>
    <v-breadcrumbs :items="breads" class="dashboard__breadcrumbs">
      <template #divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>

    <v-row>
      <v-col>
        <v-card flat outlined class="mt-8 mb-6">
          <v-row align="center" class="pa-4">
            <v-col>Dashboard</v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AdminIndex',
  layout: 'admin',
  data() {
    return {
      breads: [
        {
          text: 'Dashboard',
          disabled: true,
          to: '#',
        },
      ],
    }
  },
})
</script>
