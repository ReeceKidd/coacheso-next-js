import React, { useEffect, useState } from 'react'
import { Typography, Box, Grid } from '@material-ui/core'
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
    <Grid container>
      <Grid item md={6} xs={10}>
        <Box m={15} style={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            <Typography variant="h1" component="h1">
              Improve rapidly with a coach
            </Typography>
            <Typography variant="h4" component="h4" gutterBottom>
              What skill do you want help with?
            </Typography>
            <SkillsSearchForm
              onSubmit={() => router.push(`/coaches?skill=${skill}`)}
              availableSkills={availableSkills}
              setSkill={setSkill}
              skill={skill}
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        md={6}
        xs={2}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'flexStart' }}
      >
        <Image src="/rocket.png" width="500" height="500" />
      </Grid>
      <Grid
        item
        xs={12}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Typography variant="h3" component="h3">
          How it works
        </Typography>
      </Grid>
      <Grid
        item
        md={4}
        xs={12}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image src="/person-exploring.png" width="200" height="200" />
        <Typography variant="h4" component="h4">
          Find a coach
        </Typography>
      </Grid>
      <Grid
        item
        md={4}
        xs={12}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image src="/calendar.png" width="200" height="200" />
        <Typography variant="h4" component="h4">
          Book a lesson
        </Typography>
      </Grid>
      <Grid
        item
        md={4}
        xs={12}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image src="/person-balloons.png" width="200" height="200" />
        <Typography variant="h4" component="h4">
          Improve rapidly
        </Typography>
      </Grid>
    </Grid>
  )
}
