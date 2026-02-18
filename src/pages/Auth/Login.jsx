import { Button, TextField, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function LoginForm() {
  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%'
      }}
    >
      <TextField label='Email' variant='outlined' fullWidth required />
      <TextField
        label='password'
        type='password'
        variant='outlined'
        fullWidth
        required
      />

      <Button variant='contained' type='submit' size='large' fullWidth>
        Login
      </Button>

      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <Typography variant='body2'>
          Chưa có tài khoản?{' '}
          <Link
            to='/register'
            style={{ textDecoration: 'none', color: '#1976d2' }}
          >
            Register
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default LoginForm
