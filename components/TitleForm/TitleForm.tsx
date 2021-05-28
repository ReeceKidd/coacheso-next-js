import { TextField, Button, makeStyles, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik'
import * as React from 'react'

interface Values {
  title: string
}

export interface TitleFormProps {
  showTitleForm: boolean
  setShowTitleForm: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (values: Values) => void
  setTitle: React.Dispatch<React.SetStateAction<string>>
  title?: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

export const TitleForm: React.FC<TitleFormProps> = ({
  showTitleForm,
  setShowTitleForm,
  setTitle,
  onSubmit,
  title,
}): JSX.Element => {
  const classes = useStyles()

  return showTitleForm ? (
    <Formik
      initialValues={{ title: title || '' }}
      onSubmit={(values) => {
        onSubmit(values)
        setShowTitleForm(!showTitleForm)
        setTitle(values.title)
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form className={classes.root}>
          <div>
            <TextField
              placeholder={'Enter your title'}
              name="title"
              value={values.title}
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
              onClick={() => setShowTitleForm(!showTitleForm)}
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
    <Typography>{title}</Typography>
  )
}
