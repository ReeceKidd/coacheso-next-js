import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'http://localhost:2000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem('access_token')
  console.log('ACCESS_TOKEN', accessToken)
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export function useApollo(): ApolloClient<NormalizedCacheObject> {
  return client
}
