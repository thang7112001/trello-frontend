import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import LockIcon from '@mui/icons-material/Lock'
import LogoutIcon from '@mui/icons-material/Logout'
import InputAdornment from '@mui/material/InputAdornment'
import { useForm } from 'react-hook-form'
import { useConfirm } from 'material-ui-confirm'
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '../../utils/validators'
import FieldErrorAlert from '../../components/form/FieldErrorAlert'
import { useDispatch } from 'react-redux'
import { logoutUserApi, updateUserAPI } from '../../redux/user/userSlice'
import { toast } from 'react-toastify'

function SecurityTab() {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  // Khởi tạo hook useConfirm
  const confirmChangePassword = useConfirm()

  const submitChangePassword = (data) => {
    confirmChangePassword({
      title: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LogoutIcon sx={{ color: 'warning.dark' }} /> Change Password
        </Box>
      ),
      description:
        'You have to login again after successfully changing your password. Continue?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    })
      .then((result) => {
        // Khi người dùng bấm Confirm thì đoạn code này mới chạy
        if (result.confirmed === false) return
        const { current_password, new_password } = data

        // Gọi API...
        toast
          .promise(
            dispatch(updateUserAPI({ current_password, new_password })),
            {
              pending: 'Updating...'
            }
          )
          .then((res) => {
            if (!res.error) {
              toast.success(
                'User successfully changed your password, please login again'
              )
              dispatch(logoutUserApi(false))
            }
          })
      })
      .catch(() => {
        // Nếu bấm Cancel thì bay vào đây catch lỗi (thường để trống để không làm gì cả)
      })
  }

  return (
    <form onSubmit={handleSubmit(submitChangePassword)}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Typography variant='h6' fontWeight='bold' align='center'>
          Change Password
        </Typography>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <Box>
            <TextField
              label='Current Password'
              type='password'
              variant='outlined'
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockIcon />
                  </InputAdornment>
                )
              }}
              error={!!errors['current_password']}
              {...register('current_password', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
            />
            <FieldErrorAlert errors={errors} fieldName={'current_password'} />
          </Box>

          <Box>
            <TextField
              label='New Password'
              type='password'
              variant='outlined'
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockIcon />
                  </InputAdornment>
                )
              }}
              error={!!errors['new_password']}
              {...register('new_password', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
            />
            <FieldErrorAlert errors={errors} fieldName={'new_password'} />
          </Box>

          <Box>
            <TextField
              label='Confirm New Password'
              type='password'
              variant='outlined'
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockIcon />
                  </InputAdornment>
                )
              }}
              error={!!errors['new_password_confirmation']}
              {...register('new_password_confirmation', {
                validate: (value) => {
                  if (value === watch('new_password')) {
                    return true
                  }
                  return 'Password confirmation is incorrect'
                }
              })}
            />
            <FieldErrorAlert
              errors={errors}
              fieldName={'new_password_confirmation'}
            />
          </Box>

          <Button
            className='interceptor-loading'
            variant='contained'
            color='primary'
            fullWidth
            size='large'
            sx={{ mt: 1 }}
            type='submit'
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </form>
  )
}

export default SecurityTab
