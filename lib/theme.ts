import grey from '@material-ui/core/colors/grey'
import { createMuiTheme } from '@material-ui/core/styles'

const themeDark = createMuiTheme({
  palette: {
    primary: { main: grey[200] },
    secondary: { main: grey[400] },
    type: 'dark',
  },
  typography: {
    fontFamily: ['Crimson Text', 'Serif'].join(''),
  },
})

const themeLight = createMuiTheme({
  palette: {
    primary: { main: grey[800] },
    secondary: { main: grey[900] },
    type: 'light',
  },
  typography: {
    fontFamily: ['Crimson Text', 'Serif'].join(''),
  },
})

export { themeDark, themeLight }
