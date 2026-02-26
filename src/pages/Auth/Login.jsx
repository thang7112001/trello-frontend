import { Button, TextField, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE
} from '../../utils/validators'
import FieldErrorAlert from '../../components/form/FieldErrorAlert'

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const submitLogIn = (data) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(submitLogIn)} style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          mt: 1
        }}
      >
        <TextField
          label='Email'
          variant='outlined'
          fullWidth
          type='text'
          autoFocus
          error={!!errors['email']}
          {...register('email', {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
          })}
        />
        <FieldErrorAlert errors={errors} fieldName={'email'} />
        <TextField
          label='password'
          type='password'
          variant='outlined'
          fullWidth
          error={!!errors['password']}
          {...register('password', {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: { value: PASSWORD_RULE, message: PASSWORD_RULE_MESSAGE }
          })}
        />
        <FieldErrorAlert errors={errors} fieldName={'password'} />

        <Button
          className='interceptor-loading'
          variant='contained'
          type='submit'
          size='large'
          fullWidth
          sx={{ mt: 1 }}
        >
          Login
        </Button>

        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant='body2'>
            Do not have an account?{' '}
            <Link
              to='/register'
              style={{ textDecoration: 'none', color: '#1976d2' }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
    </form>
  )
}

export default LoginForm
