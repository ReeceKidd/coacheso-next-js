import React, { useEffect, useState } from 'react'
import { Typography, Box, Grid, makeStyles } from '@material-ui/core'
import Image from 'next/image'

import { useRouter } from 'next/router'
import { useSkillsQuery } from '../lib/graphql/Skills.graphql'
import { SkillsSearchForm } from '../components/SkillsSearchForm/SkillsSearchForm'

const useStyles = makeStyles({
  imageBox: {},
  relativeBox: {
    position: 'relative',
  },
  backgroundImage: {
    alignSelf: 'center',
  },
  foregroundImage: {
    position: 'absolute',
  },
})

export default function Index(): JSX.Element {
  const classes = useStyles()
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
    <Grid container spacing={5}>
      <Grid item md={7} xs={10}>
        <Box m={15}>
          <Typography variant="h2" component="h2">
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
      </Grid>
      <Grid item md={5} xs={1}>
        <div style={{ position: 'absolute' }}>
          <Image src="/purple-circle.png" width="800" height="400" />
        </div>
        <div style={{ position: 'absolute' }}>
          <Image className={classes.foregroundImage} src="/rocket.png" width="500" height="500" />
        </div>
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
