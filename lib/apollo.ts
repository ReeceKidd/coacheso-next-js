import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://coacheso-api-df9yx.ondigitalocean.app/graphql',
  cache: new InMemoryCache(),
})

export function useApollo(): ApolloClient<NormalizedCacheObject> {
  return client
}
