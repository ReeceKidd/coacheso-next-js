import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:2000/graphql',
  cache: new InMemoryCache(),
})

export function useApollo(): ApolloClient<NormalizedCacheObject> {
  return client
}
