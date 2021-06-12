import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Grid, Avatar, Link, Button, Paper } from '@material-ui/core'
import { useCurrentUserQuery } from '../lib/graphql/CurrentUser.graphql'
import { useUpdateCoachMutation } from '../lib/graphql/UpdateCoach.graphql'
import { useCurrentCoachQuery } from '../lib/graphql/CurrentCoach.graphql'
import { useSkillsQuery } from '../lib/graphql/Skills.graphql'
import { TitleForm } from '../components/TitleForm/TitleForm'
import { DescriptionForm } from '../components/DescriptionForm/DescriptionForm'
import { SkillsForm } from '../components/SkillsForm/SkillsForm'
import { useRouter } from 'next/router'

export default function CoachingDashboard(): JSX.Element {
  const router = useRouter()
  const { data: userData } = useCurrentUserQuery()
  const { data: coachData } = useCurrentCoachQuery()
  const { data: skillsData } = useSkillsQuery()

  const [updateCoach] = useUpdateCoachMutation()

  const [profilePicture, setProfilePicture] = useState('')
  const [name, setName] = useState('')
  const [username, setUsernmae] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [skill, setSkill] = useState('')
  const [availableSkills, setAvailableSkills] = useState([])

  const [showTitleForm, setShowTitleForm] = useState(false)
  const [showDescriptionForm, setShowDescriptionForm] = useState(false)
  const [showSkillsForm, setShowSkillsForm] = useState(false)

  useEffect(() => {
    setProfilePicture(userData?.currentUser.picture)
    setName(userData?.currentUser.name)
    setUsernmae(userData?.currentUser.username)
    setTitle(coachData?.currentCoach.title)
    setDescription(coachData?.currentCoach.description)
    if (coachData?.currentCoach.skills && coachData?.currentCoach.skills[0]) {
      setSkill(coachData.currentCoach.skills[0].skill)
    }
    if (skillsData?.skills) {
      setAvailableSkills(skillsData.skills.map((option) => option.skill))
    }
  }, [userData, coachData, skillsData])

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
