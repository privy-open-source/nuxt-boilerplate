import { ActionTree, MutationTree } from 'vuex'
import EasyAccess, { defaultMutations } from 'vuex-easy-access'

// State Types
export type Roles = {
  id: number
  name: string
  code: string
}

export type Users = {
  id: number
  privy_id: string
  name: string
  roles: Roles[]
  enable: boolean
}

export type UsersPagination = {
  page: string
  per_page: string
  total: string
  links: string[]
}

// Params Types
type ListParams = {
  page?: number
  per_page?: number
}

export interface GetAgentsParams extends ListParams {
  q?: string
}

interface CreateAgentParams {
  privy_id: string
  role_id: string
  enable: boolean
}

interface UpdateAgentParams {
  id: number | string
  form: CreateAgentParams
}

export const state = () => ({
  users_data: [],
  users_pagination: {},
  roles_data: [],

  modalUser: false,

  show_alert: false,
  loading: false,
  status: '',
  message: '',
})

export type UsersState = ReturnType<typeof state>

export const mutations: MutationTree<UsersState> = {
  ...defaultMutations(state()),
}

export const plugins = [EasyAccess()]

export const actions: ActionTree<UsersState, UsersState> = {
  // Users
  getAgents({ dispatch }, params: GetAgentsParams) {
    dispatch('set/loading', true)

    this.$axios
      .get(`api/admin/api/v1/agent`, { params })
      .then((res) => {
        dispatch('set/loading', false)
        dispatch('set/status', 'success')
        dispatch('set/users_data', res.data.data.agent)
        dispatch('set/users_pagination', res.data.meta.pagination)
      })
      .catch((err) => {
        console.error(err)
        dispatch('set/loading', false)
        dispatch('set/show_alert', true)
        dispatch('set/status', 'error')
        dispatch('set/users_data', [])
        dispatch('set/users_pagination', {})
        if (err.response.data.error) {
          dispatch('set/message', err.response.data.error.errors[0])
        } else {
          dispatch(
            'set/message',
            'Something went wrong. Please try again later...',
          )
          this.$sentry.captureException(err)
        }
      })
  },
  getRoles({ dispatch }, params: ListParams) {
    dispatch('set/loading', true)

    this.$axios
      .get(`api/admin/api/v1/role`, { params })
      .then((res) => {
        dispatch('set/loading', false)
        dispatch('set/status', 'success')
        dispatch('set/roles_data', res.data.data.role)
      })
      .catch((err) => {
        console.error(err)
        dispatch('set/loading', false)
        dispatch('set/show_alert', true)
        dispatch('set/status', 'error')
        dispatch('set/roles_data', [])
        if (err.response.data.error) {
          dispatch('set/message', err.response.data.error.errors[0])
        } else {
          dispatch(
            'set/message',
            'Something went wrong. Please try again later...',
          )
          this.$sentry.captureException(err)
        }
      })
  },
  createAgent({ dispatch }, params: CreateAgentParams) {
    dispatch('set/loading', true)

    return this.$axios
      .post(`api/admin/api/v1/agent`, params)
      .then(() => {
        dispatch('set/loading', false)
        dispatch('set/modalUser', false)
        dispatch('set/show_alert', true)
        dispatch('set/status', 'success')
        dispatch('set/message', 'Create Agent Success')
        dispatch('getAgents', {
          q: '',
          page: 1,
          per_page: 10,
        })
        return true
      })
      .catch((err) => {
        console.error(err)
        dispatch('set/loading', false)
        dispatch('set/show_alert', true)
        dispatch('set/status', 'error')
        if (err.response.data.error) {
          dispatch('set/message', err.response.data.error.errors[0])
        } else {
          dispatch(
            'set/message',
            'Something went wrong. Please try again later...',
          )
          this.$sentry.captureException(err)
        }
        return false
      })
  },
  updateAgent({ dispatch }, params: UpdateAgentParams) {
    dispatch('set/loading', true)

    return this.$axios
      .put(`api/admin/api/v1/agent/${params.id}`, params.form)
      .then(() => {
        dispatch('set/loading', false)
        dispatch('set/modalUser', false)
        dispatch('set/show_alert', true)
        dispatch('set/status', 'success')
        dispatch('set/message', 'Update Agent Success')
        dispatch('getAgents', {
          q: '',
          page: 1,
          per_page: 10,
        })
        return true
      })
      .catch((err) => {
        console.error(err)
        dispatch('set/loading', false)
        dispatch('set/show_alert', true)
        dispatch('set/status', 'error')
        if (err.response.data.error) {
          dispatch('set/message', err.response.data.error.errors[0])
        } else {
          dispatch(
            'set/message',
            'Something went wrong. Please try again later...',
          )
          this.$sentry.captureException(err)
        }
        return false
      })
  },
  deleteAgent({ dispatch }, id: number | string) {
    dispatch('set/loading', true)

    this.$axios
      .delete(`api/admin/api/v1/agent/${id}`)
      .then(() => {
        dispatch('set/loading', false)
        dispatch('set/show_alert', true)
        dispatch('set/status', 'success')
        dispatch('set/message', 'Delete Agent Success')
        dispatch('getAgents', {
          q: '',
          page: 1,
          per_page: 10,
        })
      })
      .catch((err) => {
        console.error(err)
        dispatch('set/loading', false)
        dispatch('set/show_alert', true)
        dispatch('set/status', 'error')
        if (err.response.data.error) {
          dispatch('set/message', err.response.data.error.errors[0])
        } else {
          dispatch(
            'set/message',
            'Something went wrong. Please try again later...',
          )
          this.$sentry.captureException(err)
        }
      })
  },
}
