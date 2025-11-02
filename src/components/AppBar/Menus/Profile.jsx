import React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Logout from '@mui/icons-material/Logout'
import Settings from '@mui/icons-material/Settings'

function Profile() {
  const [ anchorEl, setAnchorEl ] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profile' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }} alt='lỗi' src='https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/326030920_525241166252748_4847095270224688499_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGMtsweasouutUGSs22GGwJzor4MfTYrxjOivgx9NivGPv4TTBETkoC0ICWda0xEyino-b3hbd5pwsffqBmEgVZ&_nc_ohc=shMYmONMAIEQ7kNvwGClDNx&_nc_oc=AdmCi6XFHWvZ1fF19dhkUdMRL2_tSjJESvRppImAPfIjrZG4rMfZ3_6x1LN9q9vphESBBToWMK-6kbZFZM83QxWy&_nc_zt=24&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=Jy18_jK63lLcGrMzzaPQHQ&oh=00_Afi6dHLB7YJq47_AXh_1meKYnLBp52hbIaj1JlMXwhLYbw&oe=690C93A1'/>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-workspace"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width: 28, height: 28, marginRight: 2 }} /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ width: 28, height: 28, marginRight: 2 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profile
