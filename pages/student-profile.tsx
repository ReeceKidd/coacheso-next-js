import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Grid, Avatar } from '@material-ui/core'
import { useCurrentUserQuery } from '../lib/graphql/CurrentUser.graphql'

export default function StudentProfile(): JSX.Element {
  const { data: userData } = useCurrentUserQuery()

  const [profilePicture, setProfilePicture] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    setProfilePicture(userData?.currentUser.picture)
    setName(userData?.currentUser.name)
    setUsername(userData?.currentUser.username)
  }, [userData])

  return (
    <Container maxWidth="xl" style={{ backgroundColor: '#F7F7F7', marginTop: 10 }}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
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
                src={profilePicture}
                style={{
                  height: '70px',
                  width: '70px',
                }}
              />
            </Box>
            <Box>
              <Typography variant="h5">{name}</Typography>
            </Box>
            <Box>
              <Typography variant="h6">{`@${username}`}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box p="1rem" style={{ backgroundColor: '#FFF' }} m={3} border={1} borderColor="#ddd">
            <Typography variant="h5" component="h1" gutterBottom>
              Coaches
            </Typography>
            <Typography>{`You don't have any coaches yet`}</Typography>
          </Box>
          <Box p="1rem" style={{ backgroundColor: '#FFF' }} m={3} border={1} borderColor="#ddd">
            <Typography variant="h5" component="h1" gutterBottom>
              Reviews
            </Typography>

            <Typography>{`You don't have any reviews yet`}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
