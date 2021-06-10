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
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreIcon from '@material-ui/icons/MoreVert'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCurrentUserQuery, UserMode } from '../../lib/graphql/CurrentUser.graphql'
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
  const [anchorElement, setAnchorElement] = useState(null)
  const [mobileMoreAnchorElement, setMobileMoreAnchorElement] = useState(null)

  const isMenuOpen = Boolean(anchorElement)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorElement)

  const handleMenuClose = (): void => {
    setAnchorElement(null)
    handleMobileMenuClose()
  }
  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorElement(null)
  }
  const handleMobileMenuOpen = (event): void => {
    setMobileMoreAnchorElement(event.currentTarget)
  }

  const profileIcon = currentUser && (
    <IconButton
      color="inherit"
      onClick={() =>
        currentUser.mode === UserMode.Coach
          ? router.push('/coaching-dashboard')
          : router.push('/student-dashboard')
      }
    >
      {profilePicture ? <Avatar src={profilePicture} alt="User profile " /> : <AccountCircle />}
    </IconButton>
  )

  const switchToCoachingLink = currentUser && mode === UserMode.Student && (
    <Link href={'/coaching-dashboard'}>
      <Button
        color="inherit"
        onClick={() => {
          setMode(UserMode.Coach)
          updateCurrentUser({ variables: { input: { mode: UserMode.Coach } } })
        }}
      >
        {'Switch to coaching'}
      </Button>
    </Link>
  )

  const switchToStudentLink = currentUser && mode === UserMode.Coach && (
    <Link href={'/student-dashboard'}>
      <Button
        color="inherit"
        onClick={() => {
          setMode(UserMode.Student)
          updateCurrentUser({ variables: { input: { mode: UserMode.Student } } })
        }}
      >
        {'Switch to student'}
      </Button>
    </Link>
  )

  const logoutLink = currentUser && (
    <Link href={'/api/auth/logout'}>
      <Button color="inherit">{'Logout'}</Button>
    </Link>
  )

  const menuItems = [switchToCoachingLink, switchToStudentLink, profileIcon, logoutLink]
    .filter((link) => link)
    .map((element, index) => <MenuItem key={index}>{element}</MenuItem>)

  const mobileMenuItems = [profileIcon, switchToCoachingLink, switchToStudentLink, logoutLink]
    .filter((link) => link)
    .map((element, index) => <MenuItem key={index}>{element}</MenuItem>)

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorElement}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {menuItems}
    </Menu>
  )

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
    setProfilePicture(currentUser?.picture)
    setMode(currentUser?.mode)
  }, [currentUser])

  const router = useRouter()

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              href={
                currentUser && mode === UserMode.Coach
                  ? '/coaching-dashboard'
                  : '/student-dashboard'
              }
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
          </div>
        </Toolbar>
      </AppBar>
      {isMobileMenuOpen && renderMobileMenu}
      {isMenuOpen && renderMenu}
    </div>
  )
}
