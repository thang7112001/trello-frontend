import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '../../utils/authorizeAxios'
import { API_ROOT } from '../../utils/constants'

//khởi tạo 1 giá trị slice trong redux
const initialState = {
  currentUser: null
}

//các hành động gọi api và cập nhật dữ liệu vào redux sẽ dùng  middleware createAsyncThunk đi kèm với extraReducers
export const loginUserApi = createAsyncThunk(
  'user/loginUserApi',
  async (data) => {
    const response = await authorizeAxiosInstance.post(
      `${API_ROOT}/v1/users/login`,
      data
    )
    return response.data
  }
)

//khởi tạo 1 slice trong kho lưu trữ redux
export const userSlice = createSlice({
  name: 'user',
  initialState,
  //nơi xử lý dữ liệu đồng bộ
  reducers: {},
  //nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserApi.fulfilled, (state, action) => {
      //action.payload ở đây là response.data ở trên trả về
      const user = action.payload

      state.currentUser = user
    })
  }
})

//selector là nơi dành cho các component bên dưới gọi bằng hook useSelector() để lấy dữ liệu trong kho redux store ra sử dụng
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer
