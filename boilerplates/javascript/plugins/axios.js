import { set } from '@/utils'

const AxiosPlugin = ({ $axios, app, route, store, redirect }) => {
  // Handle Axios onRequest
  $axios.onRequest((config) => {
    if (route.name.includes('admin') || route.name.includes('auth')) {
      const token = store.state.oauth.accessToken

      if (!config.headers.hasOwnProperty('Authorization') && token) {
        set(config.headers, 'Authorization', `Bearer ${token}`)
      }
    }
  })

  // Handle Axios onError
  $axios.onError((err) => {
    const code = parseInt(err.response && err.response.status)

    if (code === 401 && route.name.includes('admin')) {
      app.$logout('/401')
      return
    }

    if (code === 403 && route.name !== '/') {
      app.$logout('/403')
      return
    }

    if (code === 404) {
      if (route.name.includes('admin')) {
        app.$logout('/404')
      } else {
        redirect('/404')
      }
      return
    }

    if (code !== 401 && code !== 403 && route.name.includes('admin')) {
      console.error(err)
      app.$logout('/maintenance')
    } else {
      console.error(err)
      redirect('/maintenance')
    }
  })
}

export default AxiosPlugin
