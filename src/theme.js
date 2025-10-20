import { extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  colorSchemeSelector: 'class',
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#FFEDA8'
        },
        text: {
          primary: '#003631'
        },
        primary: {
          main: '#003631'
        },
        secondary: {
          main: '#FFEDA8'
        }
      }
    },
    dark: {
      palette: {
        background: {
          default: '#003631'
        },
        text: {
          primary: '#FFEDA8'
        },
        primary: {
          main: '#FFEDA8'
        },
        secondary: {
          main: '#003631'
        }
      }
    }
  }
})

export default theme