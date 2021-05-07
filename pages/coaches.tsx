import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useCoachesQuery } from '../lib/graphql/Coaches.graphql'
import Posts from 'components/Posts'

export default function Coaches(): JSX.Element {
  const router = useRouter()

  const activity = (router.query.activity as string)?.toLowerCase()

  const { data, loading } = useCoachesQuery({
    variables: { activity },
  })

  return (
    <Container maxWidth="lg">
      <Box p="1rem">
        <Typography variant="h4" component="h1" gutterBottom>
          Coaches
        </Typography>
        {!loading && data && data.coaches && <Posts coaches={data.coaches} />}
      </Box>
    </Container>
  )
}
