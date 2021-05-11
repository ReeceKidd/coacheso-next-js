import { handleAuth, handleCallback, AfterCallback } from '@auth0/nextjs-auth0'

const afterCallback: AfterCallback = (_req, _res, session) => {
  localStorage.setItem('id_token', session.idToken)
  localStorage.setItem('access_token', session.accessToken)
  localStorage.setItem('refresh_token', session.refreshToken)
  console.log('Session', session)
  return session
}

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback })
    } catch (error) {
      res.status(error.status || 500).end(error.message)
    }
  },
})

//https://auth0.github.io/nextjs-auth0/modules/handlers_callback.html

// Access the access token and store it here for apollo.
//https://stackoverflow.com/questions/66410826/get-accesstoken-in-auth0
