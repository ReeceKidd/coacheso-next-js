import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button, Link as LinkText, Switch } from '@material-ui/core'
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

export default function Header({ darkState, handleThemeChange }) {
  const classes = useStyles()
  const links = [{ label: 'Become a coach', href: '/become-a-coach' }]
    .filter((link) => link)
    .map(({ label, href }) => (
      <Link href={href} key={href}>
        <Button color="inherit">{label}</Button>
      </Link>
    ))

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <LinkText href="" color="inherit">
                Coacheso
              </LinkText>
            </Link>
          </Typography>
          <Switch checked={darkState} onChange={handleThemeChange} />
          {links}
        </Toolbar>
      </AppBar>
    </div>
  )
}
