import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Grid } from '@material-ui/core'
import Image from 'next/image'

import { useRouter } from 'next/router'
import { useSkillsQuery } from '../lib/graphql/Skills.graphql'
import { SkillsSearchForm } from '../components/SkillsSearchForm/SkillsSearchForm'

export default function Index(): JSX.Element {
  const router = useRouter()
  const { data } = useSkillsQuery({
    variables: {},
  })

  const [availableSkills, setAvailableSkills] = useState([])
  const [skill, setSkill] = useState('')

  useEffect(() => {
    if (data?.skills) {
      setAvailableSkills(data.skills?.map((skill) => skill.skill))
    }
  }, [data])

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item sm={6}>
          <Box m={6}>
            <Typography variant="h2" component="h2">
              Improve rapidly with a coach
            </Typography>
            <Typography variant="h4" component="h4" gutterBottom>
              What skill do you want coaching for?
            </Typography>
            <SkillsSearchForm
              onSubmit={() => router.push(`/coaches?skill=${skill}`)}
              availableSkills={availableSkills}
              setSkill={setSkill}
              skill={skill}
            />
          </Box>
        </Grid>
        <Grid item sm={6}>
          <Box m={6}>
            <Image src="/rocket.png" width="500" height="500" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
