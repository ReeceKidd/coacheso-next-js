import React, { useEffect, useState } from 'react'
import { Container, Box, Grid, Avatar, Typography, Link } from '@material-ui/core'
import { UsernameForm } from '../components/UsernameForm/UsernameForm'
import { useUpdateCurrentUserMutation } from '../lib/graphql/UpdateCurrentUser.graphql'
import { useCurrentUserQuery } from '../lib/graphql/CurrentUser.graphql'

export default function Settings(): JSX.Element {
  const { data: currentUserData } = useCurrentUserQuery()
  const [updateCurrentUser] = useUpdateCurrentUserMutation()

  const [username, setUsername] = useState('')
  const [profilePicture, setProfilePicture] = useState('')

  const [showUsernameForm, setShowUsernameForm] = useState(false)

  useEffect(() => {
    setProfilePicture(currentUserData?.currentUser.picture)
    setUsername(currentUserData?.currentUser.username)
  }, [currentUserData])

  return (
    <Container maxWidth="xl" style={{ backgroundColor: '#F7F7F7', marginTop: 10 }}>
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
        </Box>
        <Box>
          <Box border={1} borderColor="#ddd" bgcolor="#FFF" m={3} p={3}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">{'Username'}</Typography>
              {!showUsernameForm && (
                <Link onClick={() => setShowUsernameForm(!showUsernameForm)} variant="body2">
                  {'Edit username'}
                </Link>
              )}
            </div>
            <UsernameForm
              setShowUsernameForm={setShowUsernameForm}
              showUsernameForm={showUsernameForm}
              setUsername={setUsername}
              username={username}
              onSubmit={({ username }) => {
                updateCurrentUser({ variables: { input: { username } } })
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Container>
  )
}
