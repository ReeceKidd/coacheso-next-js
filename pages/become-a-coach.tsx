import React, { useState } from 'react'
import { Container, Typography, Box, TextField, Button } from '@material-ui/core'

import { CoachInput, useAddCoachMutation } from 'lib/graphql/AddCoach.graphql'
import { useRouter } from 'next/router'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export default function BecomeACoach(): JSX.Element {
  const [name, setName] = useState('')
  const [activity, setActivity] = useState('')
  const router = useRouter()

  const [addCoach] = useAddCoachMutation()

  const input: CoachInput = { activities: [activity], name }

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
        <Box m={2}>
          <form onSubmit={onSubmit} noValidate autoComplete="off">
            <TextField
              id="filled-basic-1"
              label="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="filled-basic-2"
              label="Activity"
              onChange={(e) => setActivity(e.target.value)}
            />
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
