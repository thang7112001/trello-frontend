import { extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
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
        success: {
          main: '#2e7d32', // Xanh lá đậm (Forest Green) để nổi trên nền vàng
          light: '#4caf50',
          dark: '#1b5e20',
          contrastText: '#fff'
        },
        warning: {
          main: '#ed6c02', // Cam đậm (Burnt Orange) vì màu vàng đã là nền
          light: '#ff9800',
          dark: '#e65100',
          contrastText: '#fff'
        },
        error: {
          main: '#d32f2f',
          light: '#ef5350',
          dark: '#c62828'
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
        success: {
          main: '#66bb6a', // Xanh lá sáng (Pastel Green) để nổi trên nền tối
          light: '#81c784',
          dark: '#388e3c',
          contrastText: '#003631'
        },
        warning: {
          main: '#ffa726', // Cam sáng (Amber)
          light: '#ffb74d',
          dark: '#f57c00',
          contrastText: '#003631'
        },
        error: {
          main: '#f44336',
          light: '#e57373',
          dark: '#d32f2f'
        }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#b2bec3',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#00cec9'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.vars.palette.secondary.main,
            fontSize: '0.875rem',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.vars.palette.secondary.main
            },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.vars.palette.secondary.main
              }
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: `${theme.vars.palette.secondary.main} !important`
            },
            '& fieldset': {
              borderWidth: '1px !important'
            }
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Màu mặc định của label (khi chưa bấm vào)
          color: theme.vars.palette.secondary.main,
          fontSize: '0.875rem',

          // Màu của label khi focus (khi đang bấm vào)
          '&.Mui-focused': {
            color: theme.vars.palette.secondary.main
          }
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    }
  }
})

export default theme
