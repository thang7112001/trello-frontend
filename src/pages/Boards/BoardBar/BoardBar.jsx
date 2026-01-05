import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '../../../utils/formatter'

const MENU_STYLE = {
  color: 'secondary.main',
  bgcolor: 'primary.main',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'secondary.main'
  },
  '&:hover': {
    bgcolor: 'primary.500'
  }
}

function BoardBar({ board }) {
  return (
    <div>
      <Box
        sx={{
          width: '100%',
          height: (theme) => theme.trello.boardBarHeight,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'primary.600',
          justifyContent: 'space-between',
          gap: 2,
          overflowX: 'auto',
          paddingX: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title={board?.description}>
            <Chip
              icon={<DashboardIcon />}
              label={board?.title}
              sx={MENU_STYLE}
              clickable
            />
          </Tooltip>
          <Chip
            icon={<VpnLockIcon />}
            label={capitalizeFirstLetter(board?.type)}
            sx={MENU_STYLE}
            clickable
          />
          <Chip
            icon={<AddToDriveIcon />}
            label='Add to google drive'
            sx={MENU_STYLE}
            clickable
          />
          <Chip
            icon={<BoltIcon />}
            label='Automation'
            sx={MENU_STYLE}
            clickable
          />
          <Chip
            icon={<FilterListIcon />}
            label='Filters'
            sx={MENU_STYLE}
            clickable
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            sx={{ color: 'secondary.main', borderColor: 'secondary.main' }}
            variant='outlined'
            startIcon={<PersonAddIcon />}
          >
            Invite
          </Button>
          <AvatarGroup
            max={3}
            sx={{
              '& .MuiAvatar-root': {
                width: 34,
                height: 34,
                fontSize: 16,
                cursor: 'pointer',
                color: 'white',
                '&:first-of-type': { bgcolor: '#a4b0be' }
              }
            }}
          >
            <Tooltip title='thang711'>
              <Avatar alt='thang711' src='/static/images/avatar/1.jpg' />
            </Tooltip>
            <Tooltip title='thang711'>
              <Avatar alt='thang711' src='/static/images/avatar/1.jpg' />
            </Tooltip>
            <Tooltip title='thang711'>
              <Avatar alt='thang711' src='/static/images/avatar/1.jpg' />
            </Tooltip>
            <Tooltip title='thang711'>
              <Avatar alt='thang711' src='/static/images/avatar/1.jpg' />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
    </div>
  )
}

export default BoardBar
