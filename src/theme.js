import { extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
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
          50: '#fffefa',
          100: '#fffdf7',
          200: '#fffaf0',
          300: '#fff8ea',
          400: '#fff5d6',
          500: '#fff2c2',
          600: '#ffeebf',
          700: '#FFEDA8', // <-- MÀU MAIN
          800: '#ffe78f',
          900: '#ffdf75'
        },
        secondary: {
          main: '#003631'
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
          main: '#FFEDA8'
        }
      }
    }
  }
})

export default theme