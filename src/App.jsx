import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Board from './pages/Boards/_id'
import ASCIIText from './pages/404 NOT FOUND/ASCIIText'
import Auth from './pages/Auth/Authentication'
import AccountVerification from './pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to='/login' replace={true} />
  }
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Navigate to='/boards/6955e964d974768f6222a0e2' replace={true} />
        }
      />
      {/*những route chỉ cho phép truy cập sauy khi đã login */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route path='/boards/:boardID' element={<Board />} />
      </Route>

      {/*authentication */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verification' element={<AccountVerification />} />

      <Route
        path='*'
        element={<ASCIIText enableWaves asciiFontSize={6} text='404' />}
      />
    </Routes>
  )
}

export default App
