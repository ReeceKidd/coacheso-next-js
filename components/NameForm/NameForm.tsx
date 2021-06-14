import { TextField, Button, makeStyles, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik'
import * as React from 'react'

interface Values {
  name: string
}

export interface NameFormProps {
  showNameForm: boolean
  setShowNameForm: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (values: Values) => void
  setName: React.Dispatch<React.SetStateAction<string>>
  name?: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

export const NameForm: React.FC<NameFormProps> = ({
  showNameForm,
  setShowNameForm,
  setName,
  onSubmit,
  name,
}): JSX.Element => {
  const classes = useStyles()

  return showNameForm ? (
    <Formik
      initialValues={{ name: name || '' }}
      onSubmit={(values) => {
        onSubmit(values)
        setShowNameForm(!showNameForm)
        setName(values.name)
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form className={classes.root}>
          <div>
            <TextField
              name="name"
              placeholder={name}
              value={values.name}
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
              onClick={() => {
                setShowNameForm(!showNameForm)
              }}
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
    <Typography>{name}</Typography>
  )
}
