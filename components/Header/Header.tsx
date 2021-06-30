import React from 'react'

import AuthenticatedHeader from '../AuthenticatedHeader/AuthenticatedHeader'
import UnauthenticatedHeader from '../UnauthenticatedHeader/UnauthenticatedHeader'
import useUserContext from '../../hooks/useUserContext'

export interface HeaderProps {
  darkState: boolean
  handleThemeChange: () => void
}

export default function Header({ darkState, handleThemeChange }: HeaderProps): JSX.Element {
  const { user } = useUserContext()

  if (user) {
    return (
      <AuthenticatedHeader
        user={user}
        darkState={darkState}
        handleThemeChange={handleThemeChange}
      />
    )
  }
  return <UnauthenticatedHeader darkState={darkState} handleThemeChange={handleThemeChange} />
}
