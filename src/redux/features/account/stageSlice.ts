import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface StageStateProps {
  stage: number,
  status: 'completed' | 'pending' | 'error'
}

const initialState: StageStateProps = {
  stage: 0,
  status: 'pending'
}

export const stageSlice = createSlice({
  name: 'stage',
  initialState,
  reducers: {
    increment: (state) => {
      state.stage += 1
    },
    decrement: (state) => {
      state.stage -= 1
    },
    set: (state, action: PayloadAction<number>) => {
      state.stage = action.payload
    },
    setStatus: (state, action: PayloadAction<'completed' | 'pending' | 'error'>) => {
      state.status = action.payload
    }
  }
})

export const { increment, decrement, set, setStatus } = stageSlice.actions
export default stageSlice.reducer