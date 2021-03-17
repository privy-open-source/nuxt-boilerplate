import EasyAccess, { defaultMutations } from 'vuex-easy-access'

export const state = () => ({
  drawer: true,
})

export const mutations = { ...defaultMutations(state()) }

export const plugins = [EasyAccess()]

export const actions = {
  // Validate if user exists
  async nuxtServerInit({ state, dispatch }, { route }) {
    const { accessToken } = state.oauth

    if (accessToken && route.path.includes('admin')) {
      await dispatch('session/getUser')
    }
  },
  setDrawer({ dispatch }, drawer) {
    dispatch('set/drawer', drawer)
  },
}
