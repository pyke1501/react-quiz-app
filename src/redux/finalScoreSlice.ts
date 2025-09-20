import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface finalScoreState {
  score: number
}

const initialState: finalScoreState = {
  score: 0
}

export const finalScoreSlice = createSlice({
  name: 'finalScore',
  initialState,
  reducers: {
    updateScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateScore } = finalScoreSlice.actions

export default finalScoreSlice.reducer