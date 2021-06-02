import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Grid, Avatar } from '@material-ui/core'
import { useRouter } from 'next/router'

import { useCurrentUserQuery } from '../lib/graphql/CurrentUser.graphql'
import { useSkillsQuery } from 'lib/graphql/Skills.graphql'
import { SkillsSearchForm } from 'components/SkillsSearchForm/SkillsSearchForm'

export default function StudentDashboard(): JSX.Element {
  const router = useRouter()
  const { data: userData } = useCurrentUserQuery()
  const { data: skillsData } = useSkillsQuery({
    variables: {},
  })

  const [profilePicture, setProfilePicture] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [availableSkills, setAvailableSkills] = useState([])
  const [skill, setSkill] = useState('')

  useEffect(() => {
    setProfilePicture(userData?.currentUser.picture)
    setName(userData?.currentUser.name)
    setUsername(userData?.currentUser.username)
    if (skillsData?.skills) {
      setAvailableSkills(skillsData.skills?.map((skill) => skill.skill))
    }
  }, [userData, skillsData])

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
        </Grid>
        <Grid item xs={6}>
          <Box p="1rem" style={{ backgroundColor: '#FFF' }} m={3} border={1} borderColor="#ddd">
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
          <Box p="1rem" style={{ backgroundColor: '#FFF' }} m={3} border={1} borderColor="#ddd">
            <Typography variant="h5" component="h1" gutterBottom>
              Coaches
            </Typography>
            <Typography>{`You don't have any coaches yet`}</Typography>
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
