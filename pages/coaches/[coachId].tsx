import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import { useCoachQuery } from '../../lib/graphql/Coach.graphql'
import { useRouter } from 'next/router'

export default function Coaches(): JSX.Element {
  const router = useRouter()
  const { coachId } = router.query
  const { data } = useCoachQuery({
    variables: { coachId },
  })

  return (
    <Container maxWidth="lg">
      <Box p="1rem">
        <Typography variant="h4" component="h1" gutterBottom>
          Coach
          {JSON.stringify(data)}
        </Typography>
      </Box>
    </Container>
  )
}
