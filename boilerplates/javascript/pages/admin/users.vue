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
            <v-col>
              <v-form style="height: 41px" @submit.prevent="searchAgent">
                <v-text-field
                  v-model="params.q"
                  dense
                  outlined
                  append-icon="mdi-magnify"
                  label="Search ..."
                ></v-text-field>
              </v-form>
            </v-col>
            <v-col lg="2">
              <v-btn
                dark
                depressed
                color="#4458a3"
                style="width: 100%"
                :loading="loading"
                @click="handleAdd"
              >
                Add User
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-data-table
          :loading="loading"
          :headers="table_headers"
          :items="loading ? [] : users_data"
          :server-items-length="Number(users_pagination.total)"
          :options.sync="options"
          :page.sync="params.page"
          class="elevation-1"
        >
          <template #[`item.name`]="{ item }">
            <div class="py-3">
              {{ item.name || '-' }}
              <br />
              <v-chip dark label x-small class="mt-1" color="#cb6565">
                {{ item.privy_id || '-' }}
              </v-chip>
            </div>
          </template>
          <template #[`item.role`]="{ item }">
            {{ item.roles[0].name || '-' }}
          </template>
          <template #[`item.action`]="{ item }">
            <v-btn
              dark
              depressed
              color="#31c972"
              class="mr-3"
              @click="handleEdit(item)"
            >
              Edit
            </v-btn>
            <v-btn
              dark
              depressed
              color="#f25757"
              @click="handleDelete(item.id)"
            >
              Delete
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <User
      :mode="mode"
      :form="form"
      :validator="$v"
      :privy-id-errors="privyIdErrors"
      :role-id-errors="roleIdErrors"
      :handle-cancel="handleCancel"
      :handle-submit="handleSubmit"
    />
  </v-container>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Filter from '@/utils/mixins/filter'

// Components
import User from '@/components/Dialog/User'

export default {
  name: 'AdminUsers',
  components: { User },
  mixins: [Filter],
  layout: 'admin',
  data() {
    return {
      params: {
        q: '',
        page: 1,
        per_page: 10,
      },
      options: {},
      mode: 'add',
      edit_id: '',
      form: {
        privy_id: '',
        role_id: '',
        enable: true,
      },
      breads: [
        {
          text: 'Dashboard',
          disabled: true,
          to: '#',
        },
        {
          text: 'Users',
          disabled: true,
          to: '#',
        },
      ],
      table_headers: [
        {
          text: 'Name',
          value: 'name',
          sortable: false,
        },
        { text: 'Role', value: 'role', sortable: false, align: 'center' },
        {
          text: 'Action',
          value: 'action',
          sortable: false,
          width: '19%',
        },
      ],
    }
  },
  head: { title: 'Users' },
  validations: {
    form: {
      privy_id: { required },
      role_id: { required },
      enable: { required },
    },
  },
  computed: {
    // Notification
    show_alert() {
      return this.$store.get('users/show_alert')
    },
    status() {
      return this.$store.get('users/status')
    },
    message() {
      return this.$store.get('users/message')
    },
    loading() {
      return this.$store.get('users/loading')
    },
    modalUser() {
      return this.$store.get('users/modalUser')
    },

    users_data() {
      return this.$store.get('users/users_data')
    },
    users_pagination() {
      return this.$store.get('users/users_pagination')
    },
    roles_data() {
      return this.$store.get('users/roles_data')
    },

    // Errors
    privyIdErrors() {
      const errors = []
      if (!this.$v.form.privy_id.$dirty) return errors
      !this.$v.form.privy_id.required &&
        errors.push('Privy ID tidak boleh kosong!')
      return errors
    },
    roleIdErrors() {
      const errors = []
      if (!this.$v.form.role_id.$dirty) return errors
      !this.$v.form.role_id.required && errors.push('Role tidak boleh kosong!')
      return errors
    },
  },
  watch: {
    show_alert(val) {
      if (val) {
        this.$notify({
          title: this.status === 'success' ? 'Success' : 'Error',
          type: this.status,
          text: this.message,
        })

        this.$store.set('users/show_alert', false)
      }
    },
    options: {
      handler() {
        this.getAgents({
          page: this.options.page,
          per_page: this.options.itemsPerPage,
        })
      },
      deep: true,
    },
  },
  mounted() {
    this.getAgents(this.params)
    this.$store.dispatch('users/getRoles', { page: 1, per_page: 999 })
  },
  methods: {
    getAgents(options) {
      this.$store.dispatch('users/getAgents', options)
    },
    searchAgent() {
      this.params = {
        ...this.params,
        page: 1,
        per_page: 10,
      }
      this.getAgents(this.params)
    },
    handleAdd() {
      this.mode = 'add'
      this.$store.set('users/modalUser', true)
    },
    handleEdit(data) {
      this.mode = 'edit'
      this.edit_id = data.id
      this.form.privy_id = data.privy_id
      this.form.role_id = data.roles[0].id
      this.form.enable = data.enable
      this.$store.set('users/modalUser', true)
    },
    async handleSubmit() {
      // Validate form
      this.$v.$touch()

      // If nothing is invalid
      if (!this.$v.$invalid) {
        if (this.mode === 'add') {
          // Handle Create
          const createSuccess = await this.$store.dispatch(
            'users/createAgent',
            this.form,
          )
          if (createSuccess) {
            this.reset()
          }
        } else {
          // Handle Update
          const params = {
            id: this.edit_id,
            form: this.form,
          }
          const updateSuccess = await this.$store.dispatch(
            'users/updateAgent',
            params,
          )
          if (updateSuccess) {
            this.reset()
          }
        }
      }
    },
    handleDelete(id) {
      this.$swal({
        text: `Are you sure want to delete this user?`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(async (result) => {
        if (result.value) {
          const res = await this.$store.dispatch('users/deleteAgent', id)
          if (res) {
            this.reset()
          }
        }
      })
    },
    handleCancel() {
      this.$store.set('users/modalUser', false)
      this.reset('cancel')
    },
    reset(value) {
      this.$v.$reset()
      if (!value) {
        this.options = {
          ...this.options,
          page: 1,
        }
        this.params = {
          q: '',
          page: 1,
          per_page: 10,
        }
      }
      this.form = {
        privy_id: '',
        role_id: '',
        enable: true,
      }
    },
  },
}
</script>
