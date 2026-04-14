import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'

function CardUserGroup({ cardUsers = [], limit = 4 }) {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined

  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  return (
    <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {/* Fake hiển thị user */}
      {[...Array(6)].map((_, index) => {
        if (index < limit) {
          return (
            <Tooltip title='thang711' key={index}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt='thang711'
                src='https://res.cloudinary.com/drac9m53a/image/upload/v1774482949/users/wibvevl7fu4bt0zz0ffe.jpg'
              />
            </Tooltip>
          )
        }
      })}

      {/* Nút Add User */}
      <Tooltip title='Add new user'>
        <Box
          aria-describedby={popoverId}
          onClick={handleTogglePopover}
          sx={{
            width: 36,
            height: 36,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '500',
            borderRadius: '50%',
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#2f3542' : '#091e420f',
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#33485D' : '#091e4224'
            }
          }}
        >
          <AddIcon fontSize='small' />
        </Box>
      </Tooltip>

      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorPopoverElement}
        onClose={handleTogglePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box
          sx={{
            p: 2,
            maxWidth: '235px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          <Typography variant='body2'>Add user to card feature...</Typography>
        </Box>
      </Popover>
    </Box>
  )
}

export default CardUserGroup
