import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '../../utils/authorizeAxios'
import { API_ROOT } from '../../utils/constants'
import { mapOrder } from '../../utils/sort'
import { isEmpty } from 'lodash'
import { generatePlaceholder } from '../../utils/formatter'
//khởi tạo 1 giá trị slice trong redux
const initialState = {
  currentActiveBoard: null
}

//các hành động gọi api và cập nhật dữ liệu vào redux sẽ dùng  middleware createAsyncThunk đi kèm với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await authorizeAxiosInstance.get(
      `${API_ROOT}/v1/boards/${boardId}`
    )
    return response.data
  }
)

//khởi tạo 1 slice trong kho lưu trữ redux
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  //nơi xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      //action.payload là chuẩn đặt tên nhận dữ liệu vào của reducer
      const board = action.payload

      //update lại dữ liệu của currentActiveBoard
      state.currentActiveBoard = board
    },
    updateCardInBoard: (state, action) => {
      //update nested data
      //https://redux-toolkit.js.org/usage/immer-reducers#updating-nested-data
      const inComingCard = action.payload
      //tìm từ board > column > card
      const column = state.currentActiveBoard.columns.find(
        (i) => i._id === inComingCard.columnId
      )
      if (column) {
        const card = column.cards.find((i) => i._id === inComingCard._id)
        if (card) {
          //Object.keys dùng để lấy toàn bộ key của Object ra thành 1 mảng
          Object.keys(inComingCard).forEach((key) => {
            card[key] = inComingCard[key]
          })
        }
      }
    }
  },
  //nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      //action.payload ở đây là response.data ở trên trả về
      let board = action.payload

      //thanhf viên trong board là gộp lại của 2 mảng owner và member
      board.FE_allUser = board.owners.concat(board.members)

      //sắp xếp dữ liệu các columns trc khi đưa xuống các component con
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      //xử lý kéo thả card khi column rỗng
      const newBoard = { ...board }
      newBoard.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholder(column)]
          column.cardOrderIds = [generatePlaceholder(column)._id]
        } else {
          //sắp xếp dữ liệu các cards trc khi đưa xuống các component con
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })

      //update lại dữ liệu của currentActiveBoard
      state.currentActiveBoard = board
    })
  }
})

//action là nơi dành cho các component bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer
//action này được redux tạo ra tự động theo tên của reducer
export const { updateCurrentActiveBoard, updateCardInBoard } =
  activeBoardSlice.actions

//selector là nơi dành cho các component bên dưới gọi bằng hook useSelector() để lấy dữ liệu trong kho redux store ra sử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

export const activeBoardReducer = activeBoardSlice.reducer
