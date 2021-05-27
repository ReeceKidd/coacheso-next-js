import React from 'react'
import { Container, Typography, Box, Grid, Avatar } from '@material-ui/core'
import { useUser } from '@auth0/nextjs-auth0'
import { TitleForm } from '../components/TitleForm/TitleForm'
import { useUpdateCoachMutation } from '../lib/graphql/UpdateCoach.graphql'
import { useCurrentCoachQuery } from 'lib/graphql/CurrentCoach.graphql'

export default function CoachingProfile(): JSX.Element {
  const { user } = useUser()
  const { data } = useCurrentCoachQuery()
  console.log('Data', data)
  const title = data?.currentCoach?.title
  const [updateCoach] = useUpdateCoachMutation()

  return (
    <Container maxWidth="xl" style={{ backgroundColor: '#F7F7F7', marginTop: 10 }}>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Box
            border={1}
            borderColor="#ddd"
            m={3}
            p={3}
            style={{
              backgroundColor: '#FFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Box p="1rem">
              <Avatar
                src={user?.picture}
                style={{
                  height: '70px',
                  width: '70px',
                }}
              />
            </Box>
            <Box p="1rem">
              <Typography variant="h5">{user?.name}</Typography>
            </Box>
          </Box>
          <Box border={1} borderColor="#ddd" bgcolor="#FFF" m={3} p={3}>
            <Typography variant="h5">{'Title'}</Typography>
            <TitleForm
              title={title}
              onSubmit={({ title }) => updateCoach({ variables: { input: { title } } })}
            />
          </Box>
          <Box border={1} borderColor="#ddd" bgcolor="#FFF" m={3} p={3}>
            <Typography variant="h5">{'Description'}</Typography>
          </Box>
          <Box border={1} borderColor="#ddd" bgcolor="#FFF" m={3} p={3}>
            <Typography variant="h5">{'Skills'}</Typography>
          </Box>
          <Box border={1} borderColor="#ddd" bgcolor="#FFF" m={3} p={3}>
            <Typography variant="h5">{'Certifications'}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box p="1rem" style={{ backgroundColor: '#FFF' }} m={3} border={1} borderColor="#ddd">
            <Typography variant="h5" component="h1" gutterBottom>
              Students
            </Typography>
          </Box>
          <Box p="1rem" style={{ backgroundColor: '#FFF' }} m={3} border={1} borderColor="#ddd">
            <Typography variant="h5" component="h1" gutterBottom>
              Reviews
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}