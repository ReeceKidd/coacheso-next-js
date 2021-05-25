import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link as LinkText,
  Switch,
  MenuItem,
  IconButton,
  Avatar,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

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

export default function Header({
  darkState,
  handleThemeChange,
}: {
  darkState: boolean
  handleThemeChange: () => void
}): JSX.Element {
  const classes = useStyles()
  const { user } = useUser()
  const router = useRouter()
  const links = [
    !user && { label: 'Login', href: '/api/auth/login' },
    user && { label: 'Become a coach', href: '/become-a-coach' },
    user && { label: 'Logout', href: '/api/auth/logout' },
  ]
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
          {user && (
            <MenuItem onClick={() => router.push('/profile')}>
              <IconButton color="inherit">
                {user.picture ? (
                  <Avatar src={user.picture} alt="User profile " />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </MenuItem>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
