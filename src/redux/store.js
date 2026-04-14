import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'
import { activeCardReducer } from './activeCard/activeCardSlice'

import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//cấu hình persist
const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user'] // định nghĩa các slice đc phép duy trì mỗi khi f5
  //blacklist định nghĩa các slice ko đc phép duy trì khi f5
}
//combine các reducer
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer,
  activeCard: activeCardReducer
})
//persist reducer
const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  //fix warning error when implement redux persist
  middleware: (getDefultMiddleware) =>
    getDefultMiddleware({ serializableCheck: false })
})
