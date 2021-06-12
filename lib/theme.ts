import { createMuiTheme } from '@material-ui/core/styles'

const themeDark = createMuiTheme({
  overrides: {
    MuiAppBar: {
      root: {
        background: '#161B22 !important',
      },
    },
    MuiContainer: {
      root: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
      },
    },
  },
  palette: {
    type: 'dark',
    secondary: {
      main: '#58A6FF',
    },
  },
})

const themeLight = createMuiTheme({
  overrides: {
    MuiContainer: {
      root: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
      },
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: '#2E1881',
    },
    secondary: {
      main: '#0366D6',
    },
  },
})

export { themeDark, themeLight }
