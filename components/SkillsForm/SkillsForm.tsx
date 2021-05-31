import { Button, makeStyles, Typography, FormControl, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Form, Formik } from 'formik'
import * as React from 'react'

interface Values {
  skill: string
}

export interface SkillsFormProps {
  showSkillsForm: boolean
  setShowSkillsForm: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (values: Values) => void
  setSkills: React.Dispatch<React.SetStateAction<string>>
  skill: string
  availableSkills: string[]
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

export const SkillsForm: React.FC<SkillsFormProps> = ({
  showSkillsForm,
  setShowSkillsForm,
  setSkills,
  onSubmit,
  skill,
  availableSkills,
}): JSX.Element => {
  const classes = useStyles()

  return showSkillsForm ? (
    <Formik
      initialValues={{ skill: skill || '' }}
      onSubmit={(values) => {
        onSubmit(values)
        setShowSkillsForm(!showSkillsForm)
        setSkills(values.skill)
      }}
    >
      {({ handleChange }) => (
        <Form className={classes.root}>
          <FormControl variant="outlined" style={{ display: 'flex', flexBasis: '25%' }}>
            <Autocomplete
              id="skill-search"
              options={availableSkills}
              onChange={async (e, value) => {
                handleChange(e)
                setSkills(String(value))
              }}
              renderInput={(params) => <TextField label="Skill" name="skill" {...params} />}
            />
          </FormControl>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowSkillsForm(!showSkillsForm)}
              style={{ flexGrow: 1, margin: '5%' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ flexGrow: 1, margin: '5%' }}
            >
              Update
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  ) : (
    <Typography>{skill}</Typography>
  )
}
