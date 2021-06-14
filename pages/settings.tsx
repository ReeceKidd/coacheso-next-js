import React, { useEffect, useState } from 'react'
import { Container, Box, Grid, Avatar, Typography, Link, Paper } from '@material-ui/core'
import { useUpdateCurrentUserMutation } from '../lib/graphql/UpdateCurrentUser.graphql'
import { useCurrentUserQuery } from '../lib/graphql/CurrentUser.graphql'
import { NameForm } from '../components/NameForm/NameForm'
import { UsernameForm } from '../components/UsernameForm/UsernameForm'

function Settings(): JSX.Element {
  const { data: currentUserData } = useCurrentUserQuery()
  const [updateCurrentUser] = useUpdateCurrentUserMutation()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [profilePicture, setProfilePicture] = useState('')

  const [showNameForm, setShowNameForm] = useState(false)
  const [showUsernameForm, setShowUsernameForm] = useState(false)

  useEffect(() => {
    setName(currentUserData?.currentUser.name)
    setProfilePicture(currentUserData?.currentUser.picture)
    setUsername(currentUserData?.currentUser.username)
  }, [currentUserData])

  return (
    <Container maxWidth="xl">
      <Grid item xs={12} md={4}>
        <Paper>
          <Box
            m={3}
            p={3}
            style={{
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
        </Paper>
        <Paper>
          <Box m={3} p={3}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">{'Name'}</Typography>
              {!showNameForm && (
                <Link
                  color="secondary"
                  onClick={() => setShowNameForm(!showUsernameForm)}
                  variant="body2"
                >
                  {'Edit name'}
                </Link>
              )}
            </div>
            <NameForm
              setShowNameForm={setShowNameForm}
              showNameForm={showNameForm}
              setName={setName}
              name={name}
              onSubmit={({ name }) => {
                updateCurrentUser({ variables: { input: { name } } })
              }}
            />
          </Box>
        </Paper>
        <Paper>
          <Box m={3} p={3}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">{'Username'}</Typography>
              {!showUsernameForm && (
                <Link
                  color="secondary"
                  onClick={() => setShowUsernameForm(!showUsernameForm)}
                  variant="body2"
                >
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
        </Paper>
      </Grid>
    </Container>
  )
}

export default Settings
