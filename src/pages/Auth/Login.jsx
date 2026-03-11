import { Button, TextField, Box, Typography, Alert } from '@mui/material'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE
} from '../../utils/validators'
import FieldErrorAlert from '../../components/form/FieldErrorAlert'
import { useDispatch } from 'react-redux'
import { loginUserApi } from '../../redux/user/userSlice'
import { toast } from 'react-toastify'

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // Sửa lại import useSearchParams từ react-router-dom
  let [searchParams] = useSearchParams()
  const registeredEmail = searchParams.get('registeredEmail')
  const verifiedEmail = searchParams.get('verifiedEmail')

  const submitLogIn = (data) => {
    const { email, password } = data
    toast
      .promise(dispatch(loginUserApi({ email, password })), {
        pending: 'Logging in...'
      })
      .then((res) => {
        //kieẻm tra nếu ko có lỗi thì mới redirect về route /
        if (!res.error) navigate('/')
      })
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
        {verifiedEmail && (
          <Alert
            severity='success'
            sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}
          >
            Your email&nbsp;
            <Typography
              variant='span'
              sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}
            >
              {verifiedEmail}
            </Typography>
            &nbsp;has been verified.
            <br />
            Now you can login to enjoy our services! Have a good day!
          </Alert>
        )}

        {registeredEmail && (
          <Alert
            severity='info'
            sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}
          >
            An email has been sent to&nbsp;
            <Typography
              variant='span'
              sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}
            >
              {registeredEmail}
            </Typography>
            <br />
            Please check and verify your account before logging in!
          </Alert>
        )}

        <Box>
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
        </Box>

        <Box>
          <TextField
            label='Password'
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
        </Box>

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
