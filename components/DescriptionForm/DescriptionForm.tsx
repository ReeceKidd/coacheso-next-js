import { TextField, Button, makeStyles, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik'
import * as React from 'react'

interface Values {
  description: string
}

export interface DescriptionFormProps {
  showDescriptionForm: boolean
  setShowDescriptionForm: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (values: Values) => void
  setDescription: React.Dispatch<React.SetStateAction<string>>
  description?: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

export const DescriptionForm: React.FC<DescriptionFormProps> = ({
  showDescriptionForm,
  setShowDescriptionForm,
  setDescription,
  onSubmit,
  description,
}): JSX.Element => {
  const classes = useStyles()

  return showDescriptionForm ? (
    <Formik
      initialValues={{ description: description || '' }}
      onSubmit={(values) => {
        onSubmit(values)
        setShowDescriptionForm(!showDescriptionForm)
        setDescription(values.description)
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form className={classes.root}>
          <div style={{ display: 'flex' }}>
            <TextField
              style={{ flexGrow: 1 }}
              placeholder={'Enter your description'}
              name="description"
              multiline={true}
              rows={4}
              value={values.description}
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
              onClick={() => setShowDescriptionForm(!showDescriptionForm)}
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
    <Typography>{description}</Typography>
  )
}
