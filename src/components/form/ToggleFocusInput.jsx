import { useState } from 'react'
import TextField from '@mui/material/TextField'

// thay vì phải tạo biến State để chuyển đổi qua lại giữa thẻ Input và Text thông thường thì chúng ta
// sẽ CSS lại cho cái thẻ Input trông như text bình thường, chỉ khi click và focus vào nó thì style lại
// trở về như cái input ban đầu.
// Controlled Input trong MUI: https://mui.com/material-ui/react-text-field/#uncontrolled-vs-controlled
function ToggleFocusInput({
  value,
  onChangedValue,
  inputFontSize = '16px',
  ...props
}) {
  const [inputValue, setInputValue] = useState(value)

  // Blur là khi chúng ta không còn Focus vào phần tử nữa thì sẽ trigger hành động ở đây.
  const triggerBlur = () => {
    // Nếu user xóa hết nội dung thì set lại giá trị gốc ban đầu từ props và return luôn không làm gì thêm
    if (!inputValue) {
      setInputValue(value)
      return
    }

    // Nếu giá trị không có gì thay đổi thì cũng return luôn không làm gì.
    if (inputValue === value) return

    // Khi thỏa mãn 2 điều kiện trên (có dữ liệu mới & khác dữ liệu cũ), gọi hàm truyền từ component cha xuống để xử lý gọi API
    onChangedValue(inputValue)
  }

  return (
    <TextField
      id='toggle-focus-input-controlled'
      fullWidth
      variant='outlined'
      size='small'
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={triggerBlur}
      {...props}
      sx={{
        '& .MuiOutlinedInput-input': {
          fontSize: inputFontSize,
          fontWeight: 'bold',
          cursor: 'pointer',
          px: 1,
          py: 0.5,
          color: '#003631'
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          border: '1px solid',
          borderColor: 'text.disabled'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
          {
            border: '2px solid',
            borderColor: 'black'
          },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
          cursor: 'text'
        },

        ...props.sx
      }}
    />
  )
}

export default ToggleFocusInput
