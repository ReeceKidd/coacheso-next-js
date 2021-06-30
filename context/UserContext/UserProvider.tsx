import React, { useEffect, useState } from 'react'

import { useCurrentUserQuery } from '../../lib/graphql/CurrentUser.graphql'

import UserContext from './UserContext'
import { Query } from '../../lib/graphql/CurrentUser.graphql'

export type User = Pick<Query, 'currentUser'>

export type UserProviderProps = {
  children: React.ReactElement
}

function UserProvider(props: UserProviderProps): React.ReactElement {
  const { children } = props
  const { data, refetch, error, loading } = useCurrentUserQuery()
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    setUser(data?.currentUser)
  }, [data])

  return (
    <UserContext.Provider
      value={{
        refetch,
        user,
        error,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
