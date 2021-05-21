import { initAuth0 } from '@auth0/nextjs-auth0'

export default initAuth0({
  authorizationParams: {
    scope: 'openid profile email offline_access',
    //audience: 'https://coacheso.eu.auth0.com/api/v2/',
    audience: 'https://coacheso.eu.auth0.com/userinfo',
  },
})
