import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme.js'

//cấu hình react-toasify
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import { ConfirmProvider } from 'material-ui-confirm'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme} defaultMode='system'>
      <ConfirmProvider
        defaultOptions={{
          cancellationButtonProps: { color: 'error' },
          confirmationButtonProps: { color: 'success', variant: 'outlined' }
        }}
      >
        <CssBaseline />
        <App />
        <ToastContainer theme='colored' position='bottom-left' />
      </ConfirmProvider>
    </ThemeProvider>
  </StrictMode>
)
