import { TextField, Button, makeStyles } from '@material-ui/core'
import { Form, Formik } from 'formik'
import * as React from 'react'

interface Values {
  title: string
}

export interface TitleFormProps {
  onSubmit: (values: Values) => void
  title?: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

export const TitleForm: React.FC<TitleFormProps> = ({ onSubmit, title }): JSX.Element => {
  const classes = useStyles()
  return (
    <Formik
      initialValues={{ title: title || '' }}
      onSubmit={(values) => {
        onSubmit(values)
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form className={classes.root}>
          <div>
            <TextField
              placeholder={title || values.title}
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
