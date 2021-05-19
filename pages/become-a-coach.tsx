import React, { useState } from 'react'
import { Container, Typography, Box, TextField, Button } from '@material-ui/core'

import { CoachInput, useAddCoachMutation } from 'lib/graphql/AddCoach.graphql'
import { useRouter } from 'next/router'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'

export default function BecomeACoach(): JSX.Element {
  const { user } = useUser()
  const [activity, setActivity] = useState('')
  const [title, setTitle] = useState('')
  const [background, setBackground] = useState('')
  const router = useRouter()

  const [addCoach] = useAddCoachMutation()

  const input: CoachInput = { activities: [activity], name: user.name, title, background }

  const onSubmit = async (event): Promise<void> => {
    event.preventDefault()
    await addCoach({ variables: { input } })
    router.push(`/coaches?activity=${activity}`)
  }

  return (
    <Container maxWidth="lg">
      <Box p="1rem">
        <Typography variant="h4" component="h1" gutterBottom>
          Become a coach
        </Typography>
        <Box m={10}>
          <form onSubmit={onSubmit} noValidate autoComplete="off">
            <Box m={2}>
              <TextField
                id="filled-basic-2"
                label="What do you want to coach?"
                onChange={(e) => setActivity(e.target.value)}
              />
            </Box>

            <Box />
            <Box m={2}>
              <TextField
                id="filled-basic-2"
                label="Your title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box m={2}>
              <TextField
                id="filled-basic-2"
                label="Your background"
                onChange={(e) => setBackground(e.target.value)}
              />
            </Box>

            <Button type="submit" variant="contained" color="primary">
              Sign up
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  )
}

export const getServerSideProps = withPageAuthRequired()
