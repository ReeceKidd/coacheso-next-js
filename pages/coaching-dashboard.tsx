import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Grid, Avatar, Link, Button, Paper } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useCoachingDashboardQuery } from '../lib/graphql/CoachingDashboard.graphql'
import { useUpdateCoachMutation } from '../lib/graphql/UpdateCoach.graphql'
import { useRespondToRequestMutation, RequestStatus } from '../lib/graphql/RespondToRequest.graphql'
import { NameForm } from '../components/NameForm/NameForm'
import { TitleForm } from '../components/TitleForm/TitleForm'
import { DescriptionForm } from '../components/DescriptionForm/DescriptionForm'
import { SkillsForm } from '../components/SkillsForm/SkillsForm'
import CheckIcon from '@material-ui/icons/Check'
import CrossIcon from '@material-ui/icons/Close'

export default function CoachingDashboard(): JSX.Element {
  const router = useRouter()
  const { data } = useCoachingDashboardQuery()

  const [updateCoach] = useUpdateCoachMutation()
  const [respondToRequest] = useRespondToRequestMutation()

  const [picture, setPicture] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [skill, setSkill] = useState('')
  const [availableSkills, setAvailableSkills] = useState([])
  const [coachingRequests, setCoachingRequests] = useState([])
  const [students, setStudents] = useState([])

  const [showNameForm, setShowNameForm] = useState(false)
  const [showTitleForm, setShowTitleForm] = useState(false)
  const [showDescriptionForm, setShowDescriptionForm] = useState(false)
  const [showSkillsForm, setShowSkillsForm] = useState(false)

  useEffect(() => {
    setPicture(data?.currentCoach.picture)
    setName(data?.currentCoach.name)
    setUsername(data?.currentCoach.username)
    setTitle(data?.currentCoach.title)
    setDescription(data?.currentCoach.description)
    if (data?.currentCoach.skills && data?.currentCoach.skills[0]) {
      setSkill(data.currentCoach.skills[0].skill)
    }
    if (data?.skills && data?.skills.length > 0) {
      setAvailableSkills(data?.skills.map((option) => option.skill))
    }
    if (data?.coachingRequests && data?.coachingRequests.length > 0) {
      setCoachingRequests(data?.coachingRequests)
    }
    if (data?.currentCoach && data?.currentCoach.students.length > 0) {
      setStudents(data?.currentCoach.students)
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
                <Typography variant="h5">{'Name'}</Typography>
                {!showTitleForm && (
                  <Link
                    color="secondary"
                    variant="inherit"
                    onClick={() => setShowNameForm(!showNameForm)}
                  >
                    {'Edit name'}
                  </Link>
                )}
              </div>
              <NameForm
                showNameForm={showNameForm}
                setShowNameForm={setShowNameForm}
                setName={setName}
                name={name}
                onSubmit={({ name }) => {
                  updateCoach({ variables: { input: { name } } })
                }}
              />
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
                  <div key={index} style={{ display: 'flex' }}>
                    <div style={{ flexDirection: 'column', justifyContent: 'center' }}>
                      <Avatar src={request.picture} />
                      <Typography>{request.username}</Typography>
                    </div>
                    <div style={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
                      <Button
                        onClick={async () => {
                          respondToRequest({
                            variables: {
                              input: { _id: request._id, status: RequestStatus.Accept },
                            },
                          })
                          coachingRequests.filter(
                            (coachingRequest) => coachingRequest._id !== request._id
                          )
                        }}
                        style={{ marginRight: 3, backgroundColor: 'green' }}
                        size="small"
                        variant="contained"
                        color="secondary"
                      >
                        <CheckIcon />
                      </Button>
                      <Button
                        onClick={() => {
                          respondToRequest({
                            variables: {
                              input: { _id: request._id, status: RequestStatus.Decline },
                            },
                          })
                          setCoachingRequests(
                            coachingRequests.filter(
                              (coachingRequest) => coachingRequest._id !== request._id
                            )
                          )
                        }}
                        style={{ backgroundColor: 'red' }}
                        size="small"
                        variant="contained"
                        color="secondary"
                      >
                        <CrossIcon />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </Box>
          </Paper>
          <Paper>
            <Box m={3} p={3}>
              <Typography variant="h5" component="h1" gutterBottom>
                Students
              </Typography>
              {students.length === 0 ? (
                <Typography>{`You don't have any students yet`}</Typography>
              ) : (
                students.map((student, index) => (
                  <div key={index} style={{ display: 'flex' }}>
                    <div>
                      <Avatar src={student.picture} />
                    </div>
                    <div
                      style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 10 }}
                    >
                      <Typography>{student.name}</Typography>
                      <Typography>{`@${student.username}`}</Typography>
                    </div>
                  </div>
                ))
              )}
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
