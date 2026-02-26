import authorizeAxiosInstance from '../utils/authorizeAxios'
import { API_ROOT } from '../utils/constants'

// export const fetchBoardDetailsAPI = async (boardId) => {
//   const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//   return response.data
// }

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updateData
  )
  return response.data
}

export const moveCardToDifferentColumnsApi = async (updateData) => {
  const response = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/boards/supports/moving_card`,
    updateData
  )
  return response.data
}

//columns
export const createNewColumnAPI = async (newColumnData) => {
  const response = await authorizeAxiosInstance.post(
    `${API_ROOT}/v1/columns`,
    newColumnData
  )
  return response.data
}
export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await authorizeAxiosInstance.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updateData
  )
  return response.data
}

export const deleteColumnDetailsAPI = async (columnId, updateData) => {
  const response = await authorizeAxiosInstance.delete(
    `${API_ROOT}/v1/columns/${columnId}`,
    updateData
  )
  return response.data
}

//cards
export const createNewCardAPI = async (newCardData) => {
  const response = await authorizeAxiosInstance.post(
    `${API_ROOT}/v1/cards`,
    newCardData
  )
  return response.data
}
