import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Grid, Avatar, Link } from '@material-ui/core'
import { useUser } from '@auth0/nextjs-auth0'
import { useUpdateCoachMutation } from '../lib/graphql/UpdateCoach.graphql'
import { useCurrentCoachQuery } from '../lib/graphql/CurrentCoach.graphql'
import { useSkillsQuery } from '../lib/graphql/Skills.graphql'
import { TitleForm } from '../components/TitleForm/TitleForm'
import { DescriptionForm } from '../components/DescriptionForm/DescriptionForm'
import { SkillsForm } from '../components/SkillsForm/SkillsForm'

export default function CoachingProfile(): JSX.Element {
  const { user } = useUser()
  const { data: coachData } = useCurrentCoachQuery()
  const { data: skillsData } = useSkillsQuery()

  const [updateCoach] = useUpdateCoachMutation()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [skill, setSkill] = useState('')
  const [availableSkills, setAvailableSkills] = useState([])

  const [showTitleForm, setShowTitleForm] = useState(false)
  const [showDescriptionForm, setShowDescriptionForm] = useState(false)
  const [showSkillsForm, setShowSkillsForm] = useState(false)

  useEffect(() => {
    setTitle(coachData?.currentCoach.title)
    setDescription(coachData?.currentCoach.description)
    if (coachData?.currentCoach.skills && coachData?.currentCoach.skills[0]) {
      setSkill(coachData.currentCoach.skills[0].skill)
    }
    if (skillsData?.skills) {
      setAvailableSkills(skillsData.skills.map((option) => option.skill))
    }
  }, [coachData, skillsData])

  return (
    <Container maxWidth="xl" style={{ backgroundColor: '#F7F7F7', marginTop: 10 }}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Box
            border={1}
            borderColor="#ddd"
            m={3}
            p={3}
            style={{
              backgroundColor: '#FFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Box p="1rem">
              <Avatar
                src={user?.picture}
                style={{
                  height: '70px',
                  width: '70px',
                }}
              />
            </Box>
          </Box>
          <Box border={1} borderColor="#ddd" bgcolor="#FFF" m={3} p={3}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">{'Title'}</Typography>
              {!showTitleForm && (
                <Link onClick={() => setShowTitleForm(!showTitleForm)} variant="body2">
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
          <Box border={1} borderColor="#ddd" bgcolor="#FFF" m={3} p={3}>
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
                <Link onClick={() => setShowDescriptionForm(!showDescriptionForm)} variant="body2">
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
          <Box border={1} borderColor="#ddd" bgcolor="#FFF" m={3} p={3}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h5">{'Skills'}</Typography>
              {!showSkillsForm && (
                <Link onClick={() => setShowSkillsForm(!showSkillsForm)} variant="body2">
                  {'Edit skill'}
                </Link>
              )}
            </div>
            <SkillsForm
              showSkillsForm={showSkillsForm}
              setShowSkillsForm={setShowSkillsForm}
              setSkills={setSkill}
              skill={skill}
              availableSkills={availableSkills}
              onSubmit={({ skill }) => {
                updateCoach({ variables: { input: { skills: [{ skill }] } } })
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box p="1rem" style={{ backgroundColor: '#FFF' }} m={3} border={1} borderColor="#ddd">
            <Typography variant="h5" component="h1" gutterBottom>
              Students
            </Typography>
            <Typography>{`You don't have any students yet`}</Typography>
          </Box>
          <Box p="1rem" style={{ backgroundColor: '#FFF' }} m={3} border={1} borderColor="#ddd">
            <Typography variant="h5" component="h1" gutterBottom>
              Reviews
            </Typography>

            <Typography>{`You don't have any reviews yet`}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
