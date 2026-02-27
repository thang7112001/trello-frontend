import { useState, useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner'
import { verifyUserAPI } from '../../apis'

function AccountVerification() {
  //llấy giá trị email và token từ URL
  let [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const token = searchParams.get('token')
  //tạo một biến state dể biết đc là đã verify tài khoản thành công chưa
  const [verified, setVerified] = useState(false)
  //goij api để verify tài khaorn
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])
  //nếu url cos vấn đề, ko tồn tại 1 trong 2 giá trị token hoặc email thì ra trang 404 luôn
  if (!email || !token) {
    return <Navigate to='/404' />
  }
  //nếu chưa verify thì hiện loading
  if (!verified) {
    return <PageLoadingSpinner caption='Verifing your account!' />
  }

  //nếu verify thành công thì sẽ điều hướng về login page cũng giá trị verifiedEmail
  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification
