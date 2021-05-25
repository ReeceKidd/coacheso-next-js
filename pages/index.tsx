import React, { useState } from 'react'
import { Container, Typography, Box, TextField, makeStyles } from '@material-ui/core'

import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    width: 100,
  },
}))

export default function Index(): JSX.Element {
  const classes = useStyles()
  const router = useRouter()

  const [activity, setActivity] = useState('')

  const onSubmit = async (event): Promise<void> => {
    event.preventDefault()
    router.push(`/coaches?activity=${activity}`)
  }

  return (
    <Container maxWidth="lg">
      <Box p="1rem">
        <Typography variant="h4" component="h1" gutterBottom>
          Coacheso
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          What activity do you want coaching for?
        </Typography>
        <Box m={2}>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
            <TextField
              id="filled-basic"
              label="Enter your activity"
              onChange={(e) => setActivity(e.target.value)}
            />
          </form>
        </Box>
      </Box>
    </Container>
  )
}
