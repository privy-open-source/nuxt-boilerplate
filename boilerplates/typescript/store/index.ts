import { ActionTree, MutationTree } from 'vuex'
import EasyAccess, { defaultMutations } from 'vuex-easy-access'
import sentry from '@sentry/browser'

declare module 'vuex/types/index' {
  // eslint-disable-next-line
  interface Store<S> {
    set(key: string, value: any): any
    get(key: string): any
    delete(key: string): any
    $sentry: typeof sentry
  }
}

export const state = () => ({
  drawer: true,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  ...defaultMutations(state()),
}

export const plugins = [EasyAccess()]

export const actions: ActionTree<RootState, RootState> = {
  // Validate if user exists
  async nuxtServerInit({ state, dispatch }, { route }) {
    const { accessToken } = (state as any).oauth

    if (accessToken && route.path.includes('admin')) {
      await dispatch('session/getUser')
    }
  },
  setDrawer({ dispatch }, drawer: boolean) {
    dispatch('set/drawer', drawer)
  },
}
