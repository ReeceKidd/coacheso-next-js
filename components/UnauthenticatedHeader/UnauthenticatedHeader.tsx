import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Link as LinkText,
  Switch,
  Button,
  Menu,
  IconButton,
} from '@material-ui/core'
import MoreIcon from '@material-ui/icons/MoreVert'

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

export interface UnauthenticatedHeaderProps {
  darkState: boolean
  handleThemeChange: () => void
}

export default function UnauthenticatedHeader({
  darkState,
  handleThemeChange,
}: UnauthenticatedHeaderProps): JSX.Element {
  const classes = useStyles()

  const [mobileMoreAnchorElement, setMobileMoreAnchorElement] = useState(null)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorElement)

  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorElement(null)
  }
  const handleMobileMenuOpen = (event): void => {
    setMobileMoreAnchorElement(event.currentTarget)
  }

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
      <Link href={'/api/auth/login'}>
        <Button variant="outlined" color="inherit">
          {'Login'}
        </Button>
      </Link>
    </Menu>
  )

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
          <div className={classes.sectionDesktop}>
            <Link href={'/api/auth/login'}>
              <Button variant="outlined" color="inherit">
                {'Login'}
              </Button>
            </Link>
          </div>
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
    </div>
  )
}
