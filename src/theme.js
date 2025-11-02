import { extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '48px',
    boardBarHeight: '58px'
  },
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
          main: '#FFEDA8',
          50: '#fffef6',
          100: '#fffbdc',
          200: '#fff8c2',
          300: '#fff5a9',
          400: '#fff28f',
          500: '#FFEDA8',
          600: '#ffe57a',
          700: '#ffd864',
          800: '#ffcb4d',
          900: '#ffbe33'
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
          main: '#003631',
          50: '#e0f3f2',
          100: '#b3e1de',
          200: '#80cdc9',
          300: '#4db9b4',
          400: '#1aa9a2',
          500: '#00645c',
          600: '#004d46', // <-- Màu 600 mới, đậm hơn
          700: '#003631', // Màu MAIN
          800: '#002b27',
          900: '#001814'
        },
        secondary: {
          main: '#003631'
        }
      }
    }
  }
})

export default theme