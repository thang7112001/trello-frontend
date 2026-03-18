import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatter'
import { refreshTokenAPI } from '../apis'
import { logoutUserApi } from '../redux/user/userSlice'
/**
 * Không thể import { store } from '~/redux/store' theo cách thông thường ở đây
 * Giải pháp: Inject store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component 
  như file authorizeAxios hiện tại
 * Hiểu đơn giản: khi ứng dụng bắt đầu chạy lên, code sẽ chạy vào main.jsx đầu tiên, từ bên đó chúng ta gọi 
  hàm injectStore ngay lập tức để gán biến mainStore vào biến axiosReduxStore cục bộ trong file này.
 * https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
 */
let axiosReduxStore
export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}

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

//khởi tạo 1 cái promise cho việc gọi api refresh_token
//mục đích tạo Promise này để khi nào gọi api refresh token xong thì mới retry lại nhiều api bị lỗi trước đó
let refreshTokenPromise = null

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

    //nếu như nhận mã 401 từ backend , thì gọi api logout luôn
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserApi(false))
    }

    //nếu như nhận mã 410 từ BE, thì gọi api refresh token để làm mới access token
    const originalRequests = error.config
    if (error.response?.status === 410 && !originalRequests._retry) {
      originalRequests._retry = true
      //kiểm tra xem nếu chauw có refreshtoken promise thì thực hiện gán việc gọi api refreshtoken đồng thời gán vào cho cái refresh token promise
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then((data) => {
            //đồng thời access token đã nằm trong httpOnly cookie
            return data?.accessToken
          })
          .catch((_error) => {
            //nếu nhận bất cứ lỗi nào từ api refreshtoken thì logout
            axiosReduxStore.dispatch(logoutUserApi(false))
            return Promise.reject(_error)
          })
          .finally(() => {
            //dù api có lỗi hay ok thì vãn luôn gán lại refreshtoken promise về null như ban đầu
            refreshTokenPromise = null
          })
      }

      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        //return laij axios instance kết hợp các originalRequests để gọi lại những api ban đầu bị lỗi
        return authorizeAxiosInstance(originalRequests)
      })
    }

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
