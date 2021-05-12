import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/api/graphql',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export function useApollo(): ApolloClient<NormalizedCacheObject> {
  return client
}
