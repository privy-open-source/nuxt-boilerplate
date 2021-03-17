<template>
  <v-dialog v-model="modalUser" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline" style="color: #16347a">
          {{ mode === 'add' ? 'Add' : 'Edit' }} User
        </span>
      </v-card-title>
      <v-card-text style="padding-bottom: 0">
        <label style="color: #16347a">
          Privy ID
          <span style="color: red">*</span>
        </label>
        <v-text-field
          v-model="form.privy_id"
          required
          outlined
          dense
          :error-messages="privyIdErrors"
          @input="validator.form.privy_id.$touch()"
          @blur="validator.form.privy_id.$touch()"
        ></v-text-field>
        <label style="color: #16347a">
          Role
          <span style="color: red">*</span>
        </label>
        <v-select
          v-model="form.role_id"
          required
          outlined
          dense
          :items="roles_data"
          item-value="id"
          item-text="name"
          :error-messages="roleIdErrors"
          @blur="validator.form.role_id.$touch()"
        ></v-select>
        <label style="color: #16347a">Active</label>
        <v-switch
          v-model="form.enable"
          inset
          style="margin-top: 0; padding-top: 0"
          @input="validator.form.enable.$touch()"
          @blur="validator.form.enable.$touch()"
        ></v-switch>
      </v-card-text>
      <v-card-actions style="border-top: 1px solid #ebebeb">
        <v-spacer />
        <v-btn dark depressed color="#b2b2b2" @click="handleCancel">
          Cancel
        </v-btn>
        <v-btn
          dark
          depressed
          :loading="loading"
          color="#4458a3"
          @click="handleSubmit"
        >
          {{ mode === 'add' ? 'Add New' : 'Update' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogUser',
  props: {
    mode: { type: String, default: '' },
    form: { type: Object, default: () => {} },
    validator: { type: Object, default: () => {} },
    privyIdErrors: { type: Array, default: () => {} },
    roleIdErrors: { type: Array, default: () => {} },
    handleCancel: { type: Function, default: () => {} },
    handleSubmit: { type: Function, default: () => {} },
  },
  computed: {
    modalUser() {
      return this.$store.get('users/modalUser')
    },
    loading() {
      return this.$store.get('users/loading')
    },
    roles_data() {
      return this.$store.get('users/roles_data')
    },
  },
}
</script>
