
import { notification } from '@/interfaces/notification'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface CounterState {
  notification: Array<notification>
}

const initialState: CounterState = {
    notification: []
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotification: (state,action:PayloadAction<Array<notification>>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.notification = [...action.payload]
    },
    addNotification: (state,action:PayloadAction<notification>) => {
        state.notification = [...state.notification,action.payload]
    }
   
  },
})

// Action creators are generated for each case reducer function
export const { getNotification, addNotification} = notificationSlice.actions

export default notificationSlice.reducer

