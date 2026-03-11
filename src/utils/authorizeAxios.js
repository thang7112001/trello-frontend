import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatter'
//khởi tạo 1 đối tượng axios với mục đích để custom và cấu hình chung cho dự án
const authorizeAxiosInstance = axios.create()
//thời gian chờ tối đa 1 request: để 10p
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10
//withCredentials: sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE (phục vụ việc lưu JWT token vào trong httpOnly Cookie của trình duyệt)
authorizeAxiosInstance.defaults.withCredentials = true

//cấu hình interceptors (xử lý giữa mọi request và response )
// Interceptors request: can thiệp vào giữa những cái request API
authorizeAxiosInstance.interceptors.request.use(
  (config) => {
    interceptorLoadingElements(true)
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
  {
    synchronous: true,
    runWhen: () => {
      /* This function returns true */
    }
  }
)

// Interceptors response : can thiệp vào giữa những cái response API
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    interceptorLoadingElements(false)

    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }
    // mã lỗi 410 là GONE phục vụ việc tự động refresh lại token ko hiển thị ra màn hình
    if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }
    return Promise.reject(error)
  }
)

export default authorizeAxiosInstance
