import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import Badge from '@mui/material/Badge'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useSelector } from 'react-redux'
import { selectCurrentActiveBoard } from '../../../redux/activeBoard/activeBoardSlice'
import { CARD_MEMBER_ACTIONS } from '../../../utils/constants'

function CardUserGroup({ cardMemberIds = [], onUpdateCardMembers }) {
  const [anchorPopoverElement, setAnchorPopoverElement] = useState(null)
  const isOpenPopover = Boolean(anchorPopoverElement)
  const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined

  // lấy activeboard ra để lấy thông tin các thành viên của board
  const board = useSelector(selectCurrentActiveBoard)

  // thành viên trong card là tập con của thành viên trong board
  const FE_CardMembers = cardMemberIds.map((id) =>
    board.FE_allUser.find((u) => u._id === id)
  )

  const handleTogglePopover = (event) => {
    if (!anchorPopoverElement) setAnchorPopoverElement(event.currentTarget)
    else setAnchorPopoverElement(null)
  }

  // Hàm xử lý khi click vào 1 user trong Popover để thêm/xóa khỏi card
  const handleUpdateCardMembers = (user) => {
    //tạo biến incomingMemberInfo để gửi cho BE, với 2 thông tin chính là userid và action thêm hoặc xóa user khỏi card
    const incomingMemberInfo = {
      userId: user._id,
      action: cardMemberIds.includes(user._id)
        ? CARD_MEMBER_ACTIONS.REMOVE
        : CARD_MEMBER_ACTIONS.ADD
    }
    onUpdateCardMembers(incomingMemberInfo)
  }

  return (
    <Box sx={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {FE_CardMembers?.map((user, index) => {
        if (index < 4) {
          return (
            <Tooltip title={user?.displayName} key={index}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt={user?.displayName}
                src={user?.avatar}
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
            maxWidth: '260px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5
          }}
        >
          {/* Map toàn bộ user của Board ra đây */}
          {board?.FE_allUser?.map((user, index) => (
            <Tooltip title={user?.displayName} key={index}>
              <Badge
                sx={{ cursor: 'pointer' }}
                overlap='rectangular'
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                // Nếu user._id đã có trong cardMemberIds thì hiện icon check màu xanh
                badgeContent={
                  cardMemberIds.includes(user._id) ? (
                    <CheckCircleIcon
                      fontSize='small'
                      sx={{ color: '#27ae60' }}
                    />
                  ) : null
                }
                onClick={() => handleUpdateCardMembers(user)}
              >
                <Avatar
                  sx={{ width: 34, height: 34 }}
                  alt={user?.displayName}
                  src={user?.avatar}
                />
              </Badge>
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </Box>
  )
}

export default CardUserGroup
