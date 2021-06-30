import React from 'react'

import { UserMode } from '../lib/graphql/CurrentUser.graphql'
import CoachingDashboard from './coaching-dashboard'
import StudentDashboard from './student-dashboard'
import Landing from './landing'
import useUserContext from '../hooks/useUserContext'
import { CircularProgress, Container } from '@material-ui/core'

export default function Index(): JSX.Element {
  const { user, loading } = useUserContext()
  if (loading) {
    return (
      <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }
  if (user) {
    return user.mode === UserMode.Student ? <StudentDashboard /> : <CoachingDashboard />
  }
  return <Landing />
}
