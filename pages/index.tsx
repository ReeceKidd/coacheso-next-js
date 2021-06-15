import React from 'react'

import { useUser } from '@auth0/nextjs-auth0'

import { UserMode } from '../lib/graphql/CurrentUser.graphql'
import CoachingDashboard from './coaching-dashboard'
import StudentDashboard from './student-dashboard'
import Landing from './landing'

export default function Index(): JSX.Element {
  const { user } = useUser()
  if (user) {
    user.mode === UserMode.Student ? <StudentDashboard /> : <CoachingDashboard />
  }
  return <Landing />
}
