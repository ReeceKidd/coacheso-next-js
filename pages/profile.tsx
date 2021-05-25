import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import { useUser } from '@auth0/nextjs-auth0'

export default function Profile(): JSX.Element {
  const { user } = useUser()
  return (
    <Container maxWidth="lg">
      <Box p="1rem">
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        <Typography variant="inherit">{JSON.stringify(user)}</Typography>
      </Box>
    </Container>
  )
}
