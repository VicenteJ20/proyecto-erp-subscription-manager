import { configureStore } from '@reduxjs/toolkit'
import accountSlice from './features/account/accountSlice'
import stageSlice from './features/account/stageSlice'

export const store = configureStore({
  reducer: {
    account: accountSlice,
    currentStage: stageSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch