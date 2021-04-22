// Authentication middleware
export default function Authenticated({ app, store }) {
  // If the user hasn't logged in, redirect to login page.
  if (!store.state.oauth.accessToken) app.$login()
}
