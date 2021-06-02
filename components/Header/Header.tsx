import React from 'react'

import { useUser } from '@auth0/nextjs-auth0'
import AuthenticatedHeader from '../AuthenticatedHeader/AuthenticatedHeader'
import UnauthenticatedHeader from '../UnauthenticatedHeader/UnauthenticatedHeader'

export interface HeaderProps {
  darkState: boolean
  handleThemeChange: () => void
}

export default function Header({ darkState, handleThemeChange }: HeaderProps): JSX.Element {
  const { user } = useUser()

  if (user) {
    console.log('Entered')
    return <AuthenticatedHeader darkState={darkState} handleThemeChange={handleThemeChange} />
  }
  return <UnauthenticatedHeader darkState={darkState} handleThemeChange={handleThemeChange} />
}
