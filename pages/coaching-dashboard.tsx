import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Grid, Avatar, Link, Button, Paper } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useCoachingDashboardQuery } from '../lib/graphql/CoachingDashboard.graphql'
import { useUpdateCoachMutation } from '../lib/graphql/UpdateCoach.graphql'
import { TitleForm } from '../components/TitleForm/TitleForm'
import { DescriptionForm } from '../components/DescriptionForm/DescriptionForm'
import { SkillsForm } from '../components/SkillsForm/SkillsForm'

export default function CoachingDashboard(): JSX.Element {
  const router = useRouter()
  const { data } = useCoachingDashboardQuery()

  const [updateCoach] = useUpdateCoachMutation()

  const [profilePicture, setProfilePicture] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [skill, setSkill] = useState('')
  const [availableSkills, setAvailableSkills] = useState([])
  const [coachingRequests, setCoachingRequests] = useState([])

  const [showTitleForm, setShowTitleForm] = useState(false)
  const [showDescriptionForm, setShowDescriptionForm] = useState(false)
  const [showSkillsForm, setShowSkillsForm] = useState(false)

  useEffect(() => {
    setProfilePicture(data?.currentCoach.picture)
    setName(data?.currentCoach.name)
    setUsername(data?.currentCoach.username)
    setTitle(data?.currentCoach.title)
    setDescription(data?.currentCoach.description)
    if (data?.currentCoach.skills && data?.currentCoach.skills[0]) {
      setSkill(data.currentCoach.skills[0].skill)
    }
    if (data?.skills && data?.skills.length > 0) {
      setAvailableSkills(data.skills.map((option) => option.skill))
    }
    if (data?.coachingRequests && data?.coachingRequests.length > 0) {
      setCoachingRequests(data.coachingRequests)
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
                  src={profilePicture}
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
              <Box style={{ display: 'flex' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push(`/coaches/${username}`)}
                >
                  Preview public mode
                </Button>
              </Box>
            </Box>
          </Paper>
          <Paper>
            <Box m={3} p={3}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5">{'Title'}</Typography>
                {!showTitleForm && (
                  <Link
                    color="secondary"
                    variant="inherit"
                    onClick={() => setShowTitleForm(!showTitleForm)}
                  >
                    {'Edit title'}
                  </Link>
                )}
              </div>
              <TitleForm
                showTitleForm={showTitleForm}
                setShowTitleForm={setShowTitleForm}
                setTitle={setTitle}
                title={title}
                onSubmit={({ title }) => {
                  updateCoach({ variables: { input: { title } } })
                }}
              />
            </Box>
          </Paper>
          <Paper>
            <Box m={3} p={3}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  marginBottom: '5%',
                }}
              >
                <Typography variant="h5">{'Description'}</Typography>
                {!showTitleForm && (
                  <Link
                    color="secondary"
                    onClick={() => setShowDescriptionForm(!showDescriptionForm)}
                    variant="body2"
                  >
                    {'Edit description'}
                  </Link>
                )}
              </div>
              <DescriptionForm
                showDescriptionForm={showDescriptionForm}
                setShowDescriptionForm={setShowDescriptionForm}
                setDescription={setDescription}
                description={description}
                onSubmit={({ description }) => {
                  updateCoach({ variables: { input: { description } } })
                }}
              />
            </Box>
          </Paper>
          <Paper>
            <Box m={3} p={3}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5">{'Skills'}</Typography>
                {!showSkillsForm && (
                  <Link
                    color="secondary"
                    onClick={() => setShowSkillsForm(!showSkillsForm)}
                    variant="body2"
                  >
                    {'Edit skill'}
                  </Link>
                )}
              </div>
              <SkillsForm
                showSkillsForm={showSkillsForm}
                setShowSkillsForm={setShowSkillsForm}
                setSkill={setSkill}
                skill={skill}
                availableSkills={availableSkills}
                onSubmit={() => {
                  updateCoach({ variables: { input: { skills: [{ skill }] } } })
                }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Box m={3} p={3}>
              <Typography variant="h5" component="h1" gutterBottom>
                Coaching requests
              </Typography>
              {coachingRequests.length === 0 ? (
                <Typography>{`You don't have any coaching requests yet`}</Typography>
              ) : (
                coachingRequests.map((request, index) => (
                  <Typography key={index}>{JSON.stringify(request)}</Typography>
                ))
              )}
            </Box>
          </Paper>
          <Paper>
            <Box m={3} p={3}>
              <Typography variant="h5" component="h1" gutterBottom>
                Students
              </Typography>
              <Typography>{`You don't have any students yet`}</Typography>
            </Box>
          </Paper>
          <Paper>
            <Box m={3} p={3}>
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
