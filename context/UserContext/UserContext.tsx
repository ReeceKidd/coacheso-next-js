import { ApolloError, ApolloQueryResult } from '@apollo/client'
import { createContext } from 'react'
import { CurrentUserQuery } from '__generated__/lib/graphql/CurrentUser.graphql'
import { Exact, User } from '../../lib/graphql/CurrentUser.graphql'

export type UserContextType = {
  loading: boolean
  refetch: (
    variables?: Partial<Exact<{ [key: string]: never }>>
  ) => Promise<ApolloQueryResult<CurrentUserQuery>>
  user?: User
  error?: ApolloError
}

export const defaultContext: UserContextType = {
  loading: true,
  refetch: undefined,
  user: undefined,
  error: undefined,
}

export default createContext(defaultContext)
