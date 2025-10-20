import { createTheme } from '@mui/material/styles'
import { red, yellow } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#1c2550ff'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    text: {
      secondary: yellow[800]
    }
  }
})

export default theme