import { TextField, Button, makeStyles, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik'
import * as React from 'react'

interface Values {
  username: string
}

export interface UsernameFormProps {
  showUsernameForm: boolean
  setShowUsernameForm: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (values: Values) => void
  setUsername: React.Dispatch<React.SetStateAction<string>>
  username?: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

export const UsernameForm: React.FC<UsernameFormProps> = ({
  showUsernameForm,
  setShowUsernameForm,
  setUsername,
  onSubmit,
  username,
}): JSX.Element => {
  const classes = useStyles()

  return showUsernameForm ? (
    <Formik
      initialValues={{ username: username || '' }}
      onSubmit={(values) => {
        onSubmit(values)
        setShowUsernameForm(!showUsernameForm)
        setUsername(values.username)
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form className={classes.root}>
          <div>
            <TextField
              name="username"
              placeholder={username}
              value={values.username}
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
                setShowUsernameForm(!showUsernameForm)
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
    <Typography>{username}</Typography>
  )
}
