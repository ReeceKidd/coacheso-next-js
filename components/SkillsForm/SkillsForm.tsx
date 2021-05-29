import { TextField, Button, makeStyles, Typography } from '@material-ui/core'
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
      {({ values, handleChange, handleBlur }) => (
        <Form className={classes.root}>
          <div style={{ display: 'flex' }}>
            <TextField
              style={{ flexGrow: 1 }}
              placeholder={'Enter your skill'}
              name="skill"
              value={values.skill}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
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
