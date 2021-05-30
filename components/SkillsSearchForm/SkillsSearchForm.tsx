import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'
import { Form, Formik } from 'formik'
import * as React from 'react'

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
            <InputLabel id="skill-search-label">Skill search</InputLabel>
            <Select
              labelId="skill-search-outline-label"
              id="skill-search-select-outline"
              value={skill}
              name="skill"
              onChange={async (e) => {
                handleChange(e)
                setSkill(String(e.target.value))
              }}
              label="Skill"
            >
              {availableSkills.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
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
