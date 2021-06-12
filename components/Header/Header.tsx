import React from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import { useCurrentUserQuery } from '../../lib/graphql/CurrentUser.graphql'
import AuthenticatedHeader from '../AuthenticatedHeader/AuthenticatedHeader'
import UnauthenticatedHeader from '../UnauthenticatedHeader/UnauthenticatedHeader'

export interface HeaderProps {
  darkState: boolean
  handleThemeChange: () => void
}

export default function Header({ darkState, handleThemeChange }: HeaderProps): JSX.Element {
  const { user } = useUser()
  const { data: currentUserData } = useCurrentUserQuery()
  const currentUser = currentUserData?.currentUser
  if (user && currentUser) {
    return (
      <AuthenticatedHeader
        user={currentUser}
        darkState={darkState}
        handleThemeChange={handleThemeChange}
      />
    )
  }
  return <UnauthenticatedHeader darkState={darkState} handleThemeChange={handleThemeChange} />
}
