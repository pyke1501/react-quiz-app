import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface QuestionState {
  category: string,
  difficulty: string,
  type: string,
  amount: number
}

const initialState: QuestionState = {
  category: '',
  difficulty: '',
  type: '',
  amount: 0,
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    // setCategory: (state, action: PayloadAction<string>) => {
    //   state.category = action.payload
    // },
    // setDifficulty: (state, action: PayloadAction<string>) => {
    //   state.difficulty = action.payload
    // },
    // setType: (state, action: PayloadAction<string>) => {
    //   state.type = action.payload
    // },
    // setAmount: (state, action: PayloadAction<number>) => {
    //   state.amount = action.payload
    // }
    setFormQuestion: (state, action: PayloadAction<QuestionState>) => {
      state.category = action.payload.category;
      state.difficulty = action.payload.difficulty;
      state.type = action.payload.type;
      state.amount = action.payload.amount;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setFormQuestion } = questionSlice.actions

export default questionSlice.reducer