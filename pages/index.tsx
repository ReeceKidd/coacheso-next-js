import React from 'react'

import { useUser } from '@auth0/nextjs-auth0'

import StudentDashboard from './student-dashboard'
import Landing from './landing'

export default function Index(): JSX.Element {
  const { user } = useUser()
  if (user) {
    return <StudentDashboard />
  }
  return <Landing />
}
