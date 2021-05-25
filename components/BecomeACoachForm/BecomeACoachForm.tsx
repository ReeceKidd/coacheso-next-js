import { TextField, Button, makeStyles } from '@material-ui/core'
import { Form, Formik } from 'formik'
import * as React from 'react'

interface Values {
  activity: string
  title: string
  background: string
}

export interface BecomeACoachFormProps {
  onSubmit: (values: Values) => void
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

export const BecomeACoachForm: React.FC<BecomeACoachFormProps> = ({ onSubmit }): JSX.Element => {
  const classes = useStyles()
  return (
    <Formik
      initialValues={{ activity: '', title: '', background: '' }}
      onSubmit={(values) => {
        onSubmit(values)
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form className={classes.root}>
          <div>
            <TextField
              placeholder="Activity"
              name="activity"
              value={values.activity}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <TextField
              placeholder="Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <TextField
              placeholder="Background"
              name="background"
              value={values.background}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>

          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  )
}
