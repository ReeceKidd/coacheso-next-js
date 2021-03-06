import { initAuth0 } from '@auth0/nextjs-auth0'

// Need to figure out why I can't change the scope for initAuth0

export default initAuth0({
  baseURL: process.env.AUTH0_BASE_URL,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.AUTH0_SECRET,
  clockTolerance: 60,
  httpTimeout: 5000,
  session: {
    rollingDuration: 60 * 60 * 24,
    absoluteDuration: 60 * 60 * 24 * 7,
  },
  authorizationParams: {
    scope: 'openid profile email offline_access',
    audience: 'https://coacheso.eu.auth0.com/api/v2/',
  },
})
