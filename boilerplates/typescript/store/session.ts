import { ActionTree, MutationTree } from 'vuex'
import EasyAccess, { defaultMutations } from 'vuex-easy-access'

export const state = () => ({
  user: {
    name: '',
    roles: [{ name: '' }],
  },
})

export type SessionState = ReturnType<typeof state>

export const mutations: MutationTree<SessionState> = {
  ...defaultMutations(state()),
  user: (state, payload) => {
    state.user = payload
  },
}

export const plugins = [EasyAccess()]

export const actions: ActionTree<SessionState, SessionState> = {
  // Get User Data
  async getUser({ dispatch }) {
    try {
      const res = await this.$axios.get(`api/admin/api/v1/agent/me`)
      dispatch('set/user', res.data.data.agent)
    } catch (e) {
      console.error(e)
      this.$sentry.captureException(e)
    }
  },
}
