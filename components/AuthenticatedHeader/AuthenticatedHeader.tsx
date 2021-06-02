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

export interface AuthenticatedHeaderProps {
  darkState: boolean
  handleThemeChange: () => void
}

export default function AuthenticatedHeader({
  darkState,
  handleThemeChange,
}: AuthenticatedHeaderProps): JSX.Element {
  const classes = useStyles()
  const { data: currentUserData } = useCurrentUserQuery()

  const currentUser = currentUserData?.currentUser
  const [updateCurrentUser] = useUpdateCurrentUserMutation()

  const [profilePicture, setProfilePicture] = useState('')
  const [mode, setMode] = useState(currentUser?.mode || '')

  useEffect(() => {
    setProfilePicture(currentUser?.picture)
    setMode(currentUser?.mode)
  }, [currentUser])

  const router = useRouter()
  const links = [
    currentUser &&
      mode === UserMode.Student && {
        label: 'Switch to coaching',
        href: '/coaching-dashboard',
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
            <Link href={currentUser && mode === UserMode.Coach ? '/coaching-dashboard' : '/'}>
              <LinkText href="" color="inherit">
                Coacheso
              </LinkText>
            </Link>
          </Typography>
          <Switch checked={darkState} onChange={handleThemeChange} />
          {links}
          {currentUser && (
            <MenuItem
              onClick={() =>
                currentUser.mode === UserMode.Coach
                  ? router.push('/coaching-dashboard')
                  : router.push('/student-profile')
              }
            >
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
