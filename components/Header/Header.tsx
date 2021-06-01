import React, { useEffect, useState } from 'react'
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
import SettingsIcon from '@material-ui/icons/Settings'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCurrentUserQuery, UserMode } from '../../lib/graphql/CurrentUser.graphql'
import { useUpdateCurrentUserMutation } from '../../lib/graphql/UpdateCurrentUser.graphql'

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

export interface HeaderProps {
  darkState: boolean
  handleThemeChange: () => void
}

export default function Header({ darkState, handleThemeChange }: HeaderProps): JSX.Element {
  const classes = useStyles()
  const { data: currentUserData } = useCurrentUserQuery()
  const currentUser = currentUserData?.currentUser
  const [updateCurrentUser] = useUpdateCurrentUserMutation()

  const [profilePicture, setProfilePicture] = useState('')
  const [mode, setMode] = useState('')

  useEffect(() => {
    setProfilePicture(currentUserData?.currentUser.picture)
    setMode(currentUserData?.currentUser.mode)
  }, [currentUserData])

  const router = useRouter()
  const links = [
    !currentUser && { label: 'Login', href: '/api/auth/login' },
    currentUser &&
      mode === UserMode.Student && {
        label: 'Switch to coaching',
        href: '/coaching-profile',
        onClick: () => {
          setMode(UserMode.Coach)
          updateCurrentUser({ variables: { input: { mode: UserMode.Coach } } })
        },
      },
    currentUser &&
      mode === UserMode.Coach && {
        label: 'Switch to student',
        href: '/student-profile',
        onClick: () => {
          setMode(UserMode.Student)
          updateCurrentUser({ variables: { input: { mode: UserMode.Student } } })
        },
      },
    currentUser && { label: 'Logout', href: '/api/auth/logout' },
  ]
    .filter((link) => link)
    .map(({ label, href, onClick }) => (
      <Link href={href} key={href}>
        <Button color="inherit" onClick={onClick}>
          {label}
        </Button>
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
          {}
          {currentUser && (
            <MenuItem onClick={() => router.push('/coaching-profile')}>
              <IconButton color="inherit">
                {profilePicture ? (
                  <Avatar src={profilePicture} alt="User profile " />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            </MenuItem>
          )}
          <SettingsIcon onClick={() => router.push('/settings')} />
        </Toolbar>
      </AppBar>
    </div>
  )
}
