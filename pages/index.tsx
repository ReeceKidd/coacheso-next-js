import React from 'react'

import { useCurrentUserQuery, UserMode } from '../lib/graphql/CurrentUser.graphql'
import CoachingDashboard from './coaching-dashboard'
import StudentDashboard from './student-dashboard'
import Landing from './landing'

export default function Index(): JSX.Element {
  const { data: currentUserData } = useCurrentUserQuery()
  const user = currentUserData?.currentUser
  if (user) {
    return user.mode === UserMode.Student ? <StudentDashboard /> : <CoachingDashboard />
  }
  return <Landing />
}
