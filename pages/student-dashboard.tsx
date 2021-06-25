import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Grid, Avatar, Paper } from '@material-ui/core'
import { useRouter } from 'next/router'

import { useStudentDashboardQuery } from '../lib/graphql/StudentDashboard.graphql'
import { SkillsSearchForm } from '../components/SkillsSearchForm/SkillsSearchForm'

export default function StudentDashboard(): JSX.Element {
  const router = useRouter()
  const { data } = useStudentDashboardQuery()

  const [picture, setPicture] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [availableSkills, setAvailableSkills] = useState([])
  const [skill, setSkill] = useState('')

  useEffect(() => {
    setPicture(data?.currentStudent.picture)
    setName(data?.currentStudent.name)
    setUsername(data?.currentStudent.username)
    if (data?.skills && data?.skills.length > 0) {
      setAvailableSkills(data?.skills.map((skill) => skill.skill))
    }
  }, [data])

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
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper>
            <Box p="1rem" m={3}>
              <Typography variant="h5" component="h1" gutterBottom>
                Find a coach
              </Typography>
              <SkillsSearchForm
                onSubmit={() => router.push(`/coaches?skill=${skill}`)}
                availableSkills={availableSkills}
                setSkill={setSkill}
                skill={skill}
              />
            </Box>
          </Paper>
          <Paper>
            <Box p="1rem" m={3}>
              <Typography variant="h5" component="h1" gutterBottom>
                Coaches
              </Typography>
              <Typography>{`You don't have any coaches yet`}</Typography>
            </Box>
          </Paper>
          <Paper>
            <Box p="1rem" m={3}>
              <Typography variant="h5" component="h1" gutterBottom>
                Reviews
              </Typography>

              <Typography>{`You don't have any reviews yet`}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
