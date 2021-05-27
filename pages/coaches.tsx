import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useCoachesQuery } from '../lib/graphql/Coaches.graphql'
import Posts from '../components/Posts/Posts'

export default function Coaches(): JSX.Element {
  const router = useRouter()

  const skill = router.query.skill as string

  const { data, loading } = useCoachesQuery({
    variables: { skill },
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
