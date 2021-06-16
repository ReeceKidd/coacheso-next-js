import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Grid, Avatar, Paper } from '@material-ui/core'
import { useCoachQuery } from '../../lib/graphql/Coach.graphql'
import { useRouter } from 'next/router'

export default function CoachingProfile(): JSX.Element {
  const router = useRouter()
  const username = router.query.username as string

  const { data: coachData } = useCoachQuery({
    variables: { username },
  })

  const [picture, setpicture] = useState('')
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [skill, setSkill] = useState('')

  useEffect(() => {
    setpicture(coachData?.coach.picture)
    setName(coachData?.coach.name)
    setTitle(coachData?.coach.title)
    setDescription(coachData?.coach.description)
    if (coachData?.coach.skills && coachData?.coach.skills[0]) {
      setSkill(coachData.coach.skills[0].skill)
    }
  }, [coachData])

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
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
                  src={picture}
                  style={{
                    height: '70px',
                    width: '70px',
                  }}
                />
              </Box>
              <Box>
                <Typography variant="h5">{name}</Typography>
              </Box>
              <Box>
                <Typography variant="h6">{`@${username}`}</Typography>
              </Box>
            </Box>
          </Paper>
          <Paper>
            <Box m={3} p={3}>
              <Typography variant="h5">{`Title`}</Typography>
              <Typography>{title}</Typography>
            </Box>
          </Paper>
          <Paper>
            <Box m={3} p={3}>
              <Typography variant="h5">{`Description`}</Typography>
              <Typography>{description}</Typography>
            </Box>
          </Paper>
          <Paper>
            <Box m={3} p={3}>
              <Typography variant="h5">{`Skill`}</Typography>
              <Typography>{`Skill ${skill}`}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper>
            <Box p="1rem" m={3}>
              <Typography variant="h5" component="h1" gutterBottom>
                Students
              </Typography>
              <Typography>{`${name} has no students yet`}</Typography>
            </Box>
          </Paper>
          <Paper>
            <Box p="1rem" m={3}>
              <Typography variant="h5" component="h1" gutterBottom>
                Reviews
              </Typography>
              <Typography>{`${name} has no reviews yet`}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
