import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0'

import { useApollo } from '../lib/apollo'

import { themeDark, themeLight } from '../lib/theme'

import Header from '../components/Header/Header'
import Footer from 'components/Footer/Footer'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function MyApp(props): JSX.Element {
  const { Component, pageProps } = props

  const [darkState, setDarkState] = useState(false)
  const handleThemeChange = (): void => {
    setDarkState(!darkState)
  }

  const apolloClient = useApollo()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={darkState ? themeDark : themeLight}>
          <CssBaseline />
          <Header darkState={darkState} handleThemeChange={handleThemeChange} />
          <Component {...pageProps} />
          <Footer darkState={darkState} />
        </ThemeProvider>
      </ApolloProvider>
    </UserProvider>
  )
}
