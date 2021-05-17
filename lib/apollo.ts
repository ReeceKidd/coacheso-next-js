import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

const uri = process.env.NEXT_URL && `${process.env.NEXT_URL}/api/graphql`

const httpLink = createHttpLink({
  uri,
})

const client = new ApolloClient({
  ssrMode: true,
  link: httpLink,
  cache: new InMemoryCache(),
})

export function useApollo(): ApolloClient<NormalizedCacheObject> {
  return client
}
