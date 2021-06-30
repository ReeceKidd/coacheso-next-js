import React from 'react'

import { UserMode } from '../lib/graphql/CurrentUser.graphql'
import CoachingDashboard from './coaching-dashboard'
import StudentDashboard from './student-dashboard'
import Landing from './landing'
import useUserContext from '../hooks/useUserContext'

export default function Index(): JSX.Element {
  const { user } = useUserContext()
  if (user) {
    return user.mode === UserMode.Student ? <StudentDashboard /> : <CoachingDashboard />
  }
  return <Landing />
}
