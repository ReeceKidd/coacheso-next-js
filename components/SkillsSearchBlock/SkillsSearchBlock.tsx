import { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { Fade } from 'react-awesome-reveal'
import { useSkillsQuery } from '../../lib/graphql/Skills.graphql'
import { useRouter } from 'next/router'
import { SkillsSearchForm } from '../../components/SkillsSearchForm/SkillsSearchForm'
import SvgIcon from '../SvgIcon/SvgIcon'

export interface SkillsSearchBlockProps {
  icon: string
  title: string
  content: string
}

const SkillsSearchBlock = ({ icon, title, content }: SkillsSearchBlockProps): JSX.Element => {
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
    <Fade direction="left">
      <Box m={10}>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h2" component="h1" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
              {content}
            </Typography>
            <SkillsSearchForm
              onSubmit={() => router.push(`/coaches?skill=${skill}`)}
              availableSkills={availableSkills}
              setSkill={setSkill}
              skill={skill}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Grid>
        </Grid>
      </Box>
    </Fade>
  )
}

export default SkillsSearchBlock
