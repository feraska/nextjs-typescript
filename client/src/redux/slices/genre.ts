import { genere } from '@/interfaces/card'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface CounterState {
  genre: Array<genere>
}

const initialState: CounterState = {
  genre: []
}

export const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setGenre: (state,action:PayloadAction<Array<genere>>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.genre = [...action.payload]
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { setGenre } = genreSlice.actions

export default genreSlice.reducer

