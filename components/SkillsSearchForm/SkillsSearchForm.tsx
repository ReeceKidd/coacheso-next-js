import { FormControl, TextField, IconButton } from '@material-ui/core'
import { Form, Formik } from 'formik'
import * as React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'

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
        console.log(values)
        onSubmit(values)
        setSkill(values.skill)
      }}
    >
      {({ handleChange }) => (
        <Form>
          <FormControl variant="outlined">
            <Autocomplete
              id="skill-search"
              style={{ display: 'flex', minWidth: '200%' }}
              options={availableSkills}
              onChange={async (e, value) => {
                handleChange(e)
                setSkill(value)
              }}
              renderInput={(params) => {
                return (
                  <>
                    <TextField label="Skill" name="skill" {...params} />
                    <IconButton type="submit">
                      <SearchIcon />
                    </IconButton>
                  </>
                )
              }}
            />
          </FormControl>
        </Form>
      )}
    </Formik>
  )
}
