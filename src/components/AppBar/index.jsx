import Box from '@mui/material/Box'
import ModeSelect from '../../components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import TrelloIcon from '../../assets/mdi--trello.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpace from './Menus/WorkSpace'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menus/Profile'
import CreateIcon from '@mui/icons-material/Create'

function AppBar() {
  return (
    <div>
      <Box
        sx={{
          width: '100%',
          height: (theme) => theme.trello.appBarHeight,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'primary.500',
          justifyContent: 'space-between',
          gap: 2,
          overflowX: 'auto',
          paddingX: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} fontSize='small' inheritViewBox />
            <Typography
              variant='span'
              sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              Trello
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <WorkSpace />
            <Recent />
            <Starred />
            <Templates />
            <Button
              sx={{ color: 'secondary.main', borderColor: 'secondary.main' }}
              variant='outlined'
              startIcon={<CreateIcon />}
            >
              Create
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            sx={{ minWidth: 120 }}
            id='outlined-search'
            label='Search...'
            type='search'
            size='small'
          />
          <ModeSelect />
          <Tooltip title='Notiification'>
            <Badge color='secondary' variant='dot' sx={{ cursor: 'pointer' }}>
              <NotificationsNoneIcon />
            </Badge>
          </Tooltip>
          <Tooltip title='Help'>
            <HelpOutlineIcon sx={{ cursor: 'pointer' }} />
          </Tooltip>
          <Profile />
        </Box>
      </Box>
    </div>
  )
}

export default AppBar
