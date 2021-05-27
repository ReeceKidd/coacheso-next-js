import React from 'react'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Box, Container, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

import { BecomeACoachForm } from '../components/BecomeACoachForm/BecomeACoachForm'

import { useBecomeCoachMutation } from '../lib/graphql/BecomeCoach.graphql'

export default function BecomeACoach(): JSX.Element {
  const { user } = useUser()

  const router = useRouter()

  const [becomeCoach] = useBecomeCoachMutation()

  return (
    <Container maxWidth="lg">
      <Box p="1rem">
        <Typography variant="h4" component="h1" gutterBottom>
          Become a coach
        </Typography>
        <BecomeACoachForm
          onSubmit={async ({ skill, title }) => {
            await becomeCoach({
              variables: {
                input: {
                  name: user && user.name,
                  title,

                  profilePicture: user && user.picture,
                },
              },
            })
            router.push(`/coaches?skill=${skill}`)
          }}
        />
      </Box>
    </Container>
  )
}

export const getServerSideProps = withPageAuthRequired()
