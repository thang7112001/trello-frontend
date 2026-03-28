import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import CancelIcon from '@mui/icons-material/Cancel'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import InputAdornment from '@mui/material/InputAdornment'
import { useForm, Controller } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '../../utils/validators'
import FieldErrorAlert from '../../components/form/FieldErrorAlert'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 0,
  outline: 'none'
}

function CreateBoardModal({ isOpen, handleClose }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      type: 'public'
    }
  })

  const submitCreateBoard = (data) => {
    console.log('Dữ liệu tạo board:', data)
    // Gọi API ở đây...

    // Sau khi tạo xong thì đóng modal và reset form
    // handleClose()
    // reset()
  }

  // Hàm hỗ trợ đóng Modal và clear dữ liệu đang nhập dở
  const onModalClose = () => {
    reset()
    handleClose()
  }

  return (
    <Modal
      open={isOpen}
      onClose={onModalClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={modalStyle}>
        {/* Modal Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LibraryAddIcon />
            <Typography variant='h6' fontWeight='bold'>
              Create a new board
            </Typography>
          </Box>
          <IconButton onClick={onModalClose} sx={{ color: 'error.main' }}>
            <CancelIcon />
          </IconButton>
        </Box>

        {/* Modal Body / Form */}
        <Box
          component='form'
          onSubmit={handleSubmit(submitCreateBoard)}
          sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Box>
            <TextField
              label='Title'
              variant='outlined'
              fullWidth
              autoFocus
              error={!!errors['title']}
              {...register('title', {
                required: FIELD_REQUIRED_MESSAGE,
                minLength: {
                  value: 3,
                  message: 'Title must be at least 3 characters'
                },
                maxLength: {
                  value: 50,
                  message: 'Title max lenght is 50 characters'
                }
              })}
            />
            <FieldErrorAlert errors={errors} fieldName={'title'} />
          </Box>

          <Box>
            <TextField
              label='Description'
              variant='outlined'
              fullWidth
              multiline
              rows={3}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position='start'
                    sx={{ alignSelf: 'flex-start', mt: 1 }}
                  >
                    <DescriptionOutlinedIcon fontSize='small' />
                  </InputAdornment>
                )
              }}
              {...register('description')}
            />
          </Box>

          {/* Radio Buttons cho Type */}
          <FormControl>
            <Controller
              name='type'
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value='public'
                    control={<Radio size='small' />}
                    label='Public'
                  />
                  <FormControlLabel
                    value='private'
                    control={<Radio size='small' />}
                    label='Private'
                  />
                </RadioGroup>
              )}
            />
          </FormControl>

          {/* Nút Create */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button type='submit' variant='contained' color='primary'>
              Create
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreateBoardModal
