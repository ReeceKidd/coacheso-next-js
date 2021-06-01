import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Grid, Avatar } from '@material-ui/core'
import { useCurrentUserQuery } from '../lib/graphql/CurrentUser.graphql'
import { useCurrentCoachQuery } from '../lib/graphql/CurrentCoach.graphql'

export default function CoachingProfilePublic(): JSX.Element {
  const { data: userData } = useCurrentUserQuery()
  const { data: coachData } = useCurrentCoachQuery()

  const [profilePicture, setProfilePicture] = useState('')
  const [name, setName] = useState('')
  const [username, setUsernmae] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [skill, setSkill] = useState('')

  useEffect(() => {
    setProfilePicture(userData?.currentUser.picture)
    setName(userData?.currentUser.name)
    setUsernmae(userData?.currentUser.username)
    setTitle(coachData?.currentCoach.title)
    setDescription(coachData?.currentCoach.description)
    if (coachData?.currentCoach.skills && coachData?.currentCoach.skills[0]) {
      setSkill(coachData.currentCoach.skills[0].skill)
    }
  }, [userData, coachData])

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
          </Box>
          <Box border={1} borderColor="#ddd" bgcolor="#FFF" m={3} p={3}>
            <Typography variant="h5">{`Title`}</Typography>
            <Typography>{title}</Typography>
          </Box>
          <Box border={1} borderColor="#ddd" bgcolor="#FFF" m={3} p={3}>
            <Typography variant="h5">{`Title`}</Typography>
            <Typography>{description}</Typography>
          </Box>
          <Box border={1} borderColor="#ddd" bgcolor="#FFF" m={3} p={3}>
            <Typography variant="h5">{`Title`}</Typography>
            <Typography>{`Skill ${skill}`}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box p="1rem" style={{ backgroundColor: '#FFF' }} m={3} border={1} borderColor="#ddd">
            <Typography variant="h5" component="h1" gutterBottom>
              Students
            </Typography>
            <Typography>{`${name} has no students yet`}</Typography>
          </Box>
          <Box p="1rem" style={{ backgroundColor: '#FFF' }} m={3} border={1} borderColor="#ddd">
            <Typography variant="h5" component="h1" gutterBottom>
              Reviews
            </Typography>
            <Typography>{`${name} has no reviews yet`}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
