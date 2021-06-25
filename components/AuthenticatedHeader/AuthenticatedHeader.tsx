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
  Menu,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreIcon from '@material-ui/icons/MoreVert'
import Link from 'next/link'
import { User, UserMode } from '../../lib/graphql/CurrentUser.graphql'
import { useUpdateCurrentUserMutation } from '../../lib/graphql/UpdateCurrentUser.graphql'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

export interface AuthenticatedHeaderProps {
  user: User
  darkState: boolean
  handleThemeChange: () => void
}

export default function AuthenticatedHeader({
  user,
  darkState,
  handleThemeChange,
}: AuthenticatedHeaderProps): JSX.Element {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const classes = useStyles()

  const [updateCurrentUser] = useUpdateCurrentUserMutation()

  const [picture, setPicture] = useState('')
  const [mode, setMode] = useState(user?.mode || '')

  const [mobileMoreAnchorElement, setMobileMoreAnchorElement] = useState(null)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorElement)

  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorElement(null)
  }
  const handleMobileMenuOpen = (event): void => {
    setMobileMoreAnchorElement(event.currentTarget)
  }

  const profileIcon = user && (
    <Link href={'/settings'}>
      <IconButton color="inherit">
        {picture ? <Avatar src={picture} alt="User profile " /> : <AccountCircle />}
      </IconButton>
    </Link>
  )

  const switchToCoachingLink = user && mode === UserMode.Student && (
    <Link href={'/coaching-dashboard'}>
      <Button
        color="inherit"
        variant="outlined"
        onClick={() => {
          setMode(UserMode.Coach)
          updateCurrentUser({ variables: { input: { mode: UserMode.Coach } } })
        }}
      >
        {'Switch to coaching'}
      </Button>
    </Link>
  )

  const switchToStudentLink = user && mode === UserMode.Coach && (
    <Link href={'/student-dashboard'}>
      <Button
        color="inherit"
        variant="outlined"
        onClick={() => {
          setMode(UserMode.Student)
          updateCurrentUser({ variables: { input: { mode: UserMode.Student } } })
        }}
      >
        {'Switch to student'}
      </Button>
    </Link>
  )

  const logoutLink = user && (
    <Link href={'/api/auth/logout'}>
      <Button color="inherit" variant="outlined">
        {'Logout'}
      </Button>
    </Link>
  )

  const menuItems = [switchToCoachingLink, switchToStudentLink, profileIcon, logoutLink]
    .filter((link) => link)
    .map((element, index) => <MenuItem key={index}>{element}</MenuItem>)

  const mobileMenuItems = [profileIcon, switchToCoachingLink, switchToStudentLink, logoutLink]
    .filter((link) => link)
    .map((element, index) => <MenuItem key={index}>{element}</MenuItem>)

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorElement}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {mobileMenuItems}
    </Menu>
  )

  useEffect(() => {
    setPicture(user?.picture)
    setMode(user?.mode)
  }, [user])

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link
            href={user && mode === UserMode.Coach ? '/coaching-dashboard' : '/student-dashboard'}
          >
            <LinkText href="" color="inherit">
              Coacheso
            </LinkText>
          </Link>
        </Typography>
        <Switch checked={darkState} onChange={handleThemeChange} />
        <div className={classes.sectionDesktop}>{menuItems}</div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
          {isMobile && isMobileMenuOpen && renderMobileMenu}
        </div>
      </Toolbar>
    </AppBar>
  )
}
