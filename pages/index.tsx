import React, { useEffect, useState } from 'react'
import { Container, Typography, Box } from '@material-ui/core'

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

  const onSubmit = async (): Promise<void> => {
    router.push(`/coaches?skill=${skill}`)
  }

  useEffect(() => {
    if (data?.skills) {
      setAvailableSkills(data.skills?.map((skill) => skill.skill))
    }
  }, [data])

  return (
    <Container maxWidth="lg">
      <Box p="1rem">
        <Typography variant="h4" component="h1" gutterBottom>
          Coacheso
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          What skill do you want coaching for? {skill}
        </Typography>
        <Box m={8}>
          <SkillsSearchForm
            onSubmit={onSubmit}
            availableSkills={availableSkills}
            setSkill={setSkill}
            skill={skill}
          />
        </Box>
      </Box>
    </Container>
  )
}
