import React from 'react'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Box, Container, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

import { BecomeACoachForm } from '../components/BecomeACoachForm/BecomeACoachForm'

import { useAddCoachMutation } from '../lib/graphql/AddCoach.graphql'

export default function BecomeACoach(): JSX.Element {
  const { user } = useUser()

  const router = useRouter()

  const [addCoach] = useAddCoachMutation()

  return (
    <Container maxWidth="lg">
      <Box p="1rem">
        <Typography variant="h4" component="h1" gutterBottom>
          Become a coach
        </Typography>
        <BecomeACoachForm
          onSubmit={async ({ activity, title, background }) => {
            await addCoach({
              variables: {
                input: {
                  activities: [activity],
                  name: user && user.name,
                  title,
                  background,
                  profilePicture: user && user.picture,
                },
              },
            })
            router.push(`/coaches?activity=${activity}`)
          }}
        />
      </Box>
    </Container>
  )
}

export const getServerSideProps = withPageAuthRequired()
