import { useLocation, Navigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import LoginForm from './Login'
import RegisterForm from './Register'
import Typography from '@mui/material/Typography'
import TrelloIcon from '../../assets/mdi--trello.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../redux/user/userSlice'

function Auth() {
  const location = useLocation()

  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'

  const currentUser = useSelector(selectCurrentUser)
  if (currentUser) {
    return <Navigate to='/' replace={true} />
  }

  if (!isLogin && !isRegister) {
    return <Navigate to='/login' replace={true} />
  }

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'primary.main'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          borderRadius: 2
        }}
      >
        {/* Logo hoặc Tiêu đề chung */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <SvgIcon component={TrelloIcon} fontSize='large' inheritViewBox />
          <Typography variant='h4' fontWeight='bold' color='text.primary'>
            Trello Clone
          </Typography>
        </Box>

        {isLogin && <LoginForm />}
        {isRegister && <RegisterForm />}
      </Paper>
    </Container>
  )
}

export default Auth
