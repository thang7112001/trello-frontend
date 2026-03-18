import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import PersonIcon from '@mui/icons-material/Person'
import SecurityIcon from '@mui/icons-material/Security'
import AccountTab from './AccountTab'
import SecurityTab from './SecurityTab'
import AppBar from '../../components/AppBar/AppBar'
import { useLocation, Link } from 'react-router-dom'

// Khai báo biến TABS để sử dụng cho value của các Tab
const TABS = {
  ACCOUNT: 'account',
  SECURITY: 'security'
}

function Settings() {
  const location = useLocation()

  // Function đơn giản có nhiệm vụ lấy ra cái tab mặc định dựa theo url.
  const getDefaultTab = () => {
    if (location.pathname.includes(TABS.SECURITY)) return TABS.SECURITY
    return TABS.ACCOUNT
  }

  const [activeTab, setActiveTab] = useState(getDefaultTab())

  const handleChangeTab = (event, selectedTab) => {
    setActiveTab(selectedTab)
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar />

      <Container maxWidth='md' sx={{ mt: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleChangeTab}
            aria-label='settings tabs'
            textColor='text.primary'
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'text.primary',
                height: '3px',
                borderRadius: '4px 4px 0 0'
              }
            }}
          >
            <Tab
              icon={<PersonIcon />}
              iconPosition='start'
              label='ACCOUNT'
              value={TABS.ACCOUNT}
              component={Link}
              to='/settings/account'
              sx={{ fontWeight: 'bold' }}
            />
            <Tab
              icon={<SecurityIcon />}
              iconPosition='start'
              label='SECURITY'
              value={TABS.SECURITY}
              component={Link}
              to='/settings/security'
              sx={{ fontWeight: 'bold' }}
            />
          </Tabs>
        </Box>

        <Box sx={{ py: 4 }}>
          {activeTab === TABS.ACCOUNT && <AccountTab />}
          {activeTab === TABS.SECURITY && <SecurityTab />}
        </Box>
      </Container>
    </Box>
  )
}

export default Settings
