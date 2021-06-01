import { FormControl, Button, TextField } from '@material-ui/core'
import { Form, Formik } from 'formik'
import * as React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'

interface Values {
  skill: string
}

export interface SkillsSearchFormProps {
  onSubmit: (values: Values) => void
  setSkill: React.Dispatch<React.SetStateAction<string>>
  skill: string
  availableSkills: string[]
}

export const SkillsSearchForm: React.FC<SkillsSearchFormProps> = ({
  setSkill,
  onSubmit,
  skill,
  availableSkills,
}): JSX.Element => {
  return (
    <Formik
      initialValues={{ skill: skill || '' }}
      onSubmit={(values) => {
        onSubmit(values)
        setSkill(values.skill)
      }}
    >
      {({ handleChange }) => (
        <Form>
          <FormControl variant="outlined" style={{ display: 'flex', flexBasis: '25%' }}>
            <Autocomplete
              id="skill-search"
              options={availableSkills}
              onChange={async (e, value) => {
                handleChange(e)
                setSkill(value)
              }}
              renderInput={(params) => <TextField label="Skill" name="skill" {...params} />}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ flexGrow: 1, margin: '5%' }}
            >
              Search
            </Button>
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}
