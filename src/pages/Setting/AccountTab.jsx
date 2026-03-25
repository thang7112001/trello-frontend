import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MailIcon from '@mui/icons-material/Mail'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { styled } from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, updateUserAPI } from '../../redux/user/userSlice'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { FIELD_REQUIRED_MESSAGE } from '../../utils/validators'
import { singleFileValidator } from '../../utils/validators'
import FieldErrorAlert from '../../components/form/FieldErrorAlert'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 2
})

function AccountTab() {
  const dispatch = useDispatch()

  // Lấy thông tin user hiện tại từ Redux store
  const currentUser = useSelector(selectCurrentUser)

  // Khởi tạo giá trị mặc định cho form (key tương ứng với register phía dưới)
  const initialGeneralForm = {
    displayName: currentUser?.displayName
  }

  // Sử dụng defaultValues để set giá trị mặc định cho các field cần thiết
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialGeneralForm
  })

  const submitChangeGeneralInformation = (data) => {
    const { displayName } = data

    // Nếu không có sự thay đổi gì về displayName thì không làm gì cả
    if (displayName === currentUser?.displayName) return

    // Gọi API cập nhật thông tin ở đây...
    toast
      .promise(dispatch(updateUserAPI({ displayName })), {
        pending: 'Updating...'
      })
      .then((res) => {
        if (!res.error) {
          toast.success('User updated successfully')
        }
      })
  }

  const uploadAvatar = (e) => {
    // Lấy file thông qua e.target?.files[0] và validate nó trước khi xử lý
    // console.log('e.target?.files[0]: ', e.target?.files[0])
    const error = singleFileValidator(e.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }

    // Sử dụng FormData để xử lý dữ liệu liên quan tới file khi gọi API
    let reqData = new FormData()
    reqData.append('avatar', e.target?.files[0])

    // Cách để log được dữ liệu thông qua FormData
    // console.log('reqData: ', reqData)
    // for (const value of reqData.values()) {
    //   console.log('reqData Value: ', value)
    // }

    toast
      .promise(dispatch(updateUserAPI(reqData)), {
        pending: 'Updating...'
      })
      .then((res) => {
        if (!res.error) {
          toast.success('User updated successfully')
        }
        //dù có lỗi hay không thì cũng phải clear giá trị của file input, nếu không  thì sẽ ko thể chọn cùng 1 file liên tiếp dc
        e.target.value = ''
      })
  }

  return (
    <form onSubmit={handleSubmit(submitChangeGeneralInformation)}>
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
        {/* Profile Header: Avatar & Info */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Avatar sx={{ width: 80, height: 80 }} src={currentUser?.avatar} />
            <Button
              component='label'
              variant='outlined'
              startIcon={<CloudUploadIcon />}
              size='small'
              color='secondary'
              fullWidth
              sx={{
                borderRadius: 4,
                textTransform: 'none',
                fontWeight: 'bold',
                borderColor: 'secondary.main',
                '&:hover': {
                  borderColor: 'secondary.main',
                  backgroundColor: 'primary.400'
                }
              }}
            >
              Change Photo
              <VisuallyHiddenInput type='file' onChange={uploadAvatar} />
            </Button>
          </Box>
          <Box>
            <Typography variant='h6' fontWeight='bold'>
              {currentUser?.displayName}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              @{currentUser?.username}
            </Typography>
          </Box>
        </Box>

        {/* Form Details */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <TextField
            label='Your Email'
            variant='outlined'
            value={currentUser?.email || ''}
            disabled // Bôi xám, không cho sửa
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <MailIcon />
                </InputAdornment>
              )
            }}
          />
          <TextField
            label='Your Username'
            variant='outlined'
            value={currentUser?.username || ''}
            disabled // Bôi xám, không cho sửa
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountBoxIcon />
                </InputAdornment>
              )
            }}
          />
          <TextField
            label='Your Display Name'
            variant='outlined'
            {...register('displayName', {
              required: FIELD_REQUIRED_MESSAGE
            })}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountBoxIcon />
                </InputAdornment>
              )
            }}
          />
          <FieldErrorAlert errors={errors} fieldName={'displayName'} />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            size='large'
            sx={{ mt: 1 }}
            type='submit'
          >
            Update
          </Button>
        </Box>
      </Box>
    </form>
  )
}

export default AccountTab
