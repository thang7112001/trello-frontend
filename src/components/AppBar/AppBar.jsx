import Box from '@mui/material/Box'
import ModeSelect from '../ModeSelect/ModeSelect'
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
import { useState } from 'react'
import { InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')
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
            sx={{
              minWidth: '120px',
              maxWidth: '180px'
              // '& label': { color: 'white' },
              // '& input': { color: 'white' },
              // '& label.Mui-focused': { color: 'white' },
              // '& MuiOutlinedInput-root': {
              //   '& fieldset': { borderColor: 'white' },
              //   '&:hover fieldset': { borderColor: 'white' },
              //   '&Mui-focused fieldset': { borderColor: 'white' }
              // }
            }}
            id='outlined-search'
            label='Search...'
            type='text'
            size='small'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <CloseIcon
                    fontSize='small'
                    sx={{
                      color: searchValue ? 'white' : 'transparent',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSearchValue('')}
                  />
                </InputAdornment>
              )
            }}
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
