import grey from '@material-ui/core/colors/grey'
import { createMuiTheme } from '@material-ui/core/styles'

const themeDark = createMuiTheme({
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
    primary: { main: grey[200] },
    secondary: { main: grey[400] },
    type: 'dark',
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
    primary: { main: grey[800] },
    secondary: { main: grey[900] },
    type: 'light',
  },
})

export { themeDark, themeLight }
