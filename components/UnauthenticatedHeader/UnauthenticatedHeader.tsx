import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Link as LinkText, Switch, Button } from '@material-ui/core'

import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}))

export interface UnauthenticatedHeaderProps {
  darkState: boolean
  handleThemeChange: () => void
}

export default function UnauthenticatedHeader({
  darkState,
  handleThemeChange,
}: UnauthenticatedHeaderProps): JSX.Element {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href={'/'}>
              <LinkText href="" color="inherit">
                Coacheso
              </LinkText>
            </Link>
          </Typography>
          <Switch checked={darkState} onChange={handleThemeChange} />
          <Link href={'/api/auth/login'}>
            <Button color="inherit">{'Login'}</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}
