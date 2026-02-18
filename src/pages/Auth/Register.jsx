import { Button, TextField, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function RegisterForm() {
  return (
    <Box
      component='form'
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <TextField label='Email' variant='outlined' fullWidth required />
      <TextField
        label='password'
        type='password'
        variant='outlined'
        fullWidth
        required
      />
      <TextField
        label='Nhập lại mật khẩu'
        type='password'
        variant='outlined'
        fullWidth
        required
      />

      <Button variant='contained' type='submit' size='large' fullWidth>
        register
      </Button>

      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <Typography variant='body2'>
          Đã có tài khoản?{' '}
          <Link
            to='/login'
            style={{ textDecoration: 'none', color: '#1976d2' }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default RegisterForm
