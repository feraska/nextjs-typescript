
import User from '@/interfaces/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'


export interface CounterState {
  user?: User,
  login:number,
  socket:Socket | null 
}

const initialState: CounterState = {
    user:undefined,
    login:2,
    socket:null
    
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getSocket: (state,action:PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if(!state.socket) {
        return
      }
      state.socket = action.payload   
    },
    login: (state,action:PayloadAction<number>) => {
        state.login = action.payload
    },
    logout: (state) => {
        state.login = 0
        state.user = undefined
        state.socket = null
    },
    getUser: (state,action:PayloadAction<User>) => {
        state.user = action.payload
    },
    incUnread:(state) => {
        if(!state.user) {
            return
        }
        state.user.unread++
    },
    emptyUnread:(state) => {
        if(!state.user) {
            return
        }
        state.user.unread = 0
    },
    like: (state,action:PayloadAction<number>) => {
        if(!state.user) {
            return
        }
       state.user.likes = [...state.user.likes,action.payload]
    },
    
    dislike: (state,action:PayloadAction<number>) => {
        if(!state.user) {
            return
        }
       state.user.likes = [...state.user.likes.filter((value)=>value!==action.payload)]
    },
  addList: (state,action:PayloadAction<number>) => {
    if(!state.user) {
        return
    }
   state.user.list = [...state.user.list,action.payload]
},
removeList: (state,action:PayloadAction<number>) => {
    if(!state.user) {
        return
    }
state.user.list = [...state.user.list.filter((value)=>value!==action.payload)]

},
  }
})

// Action creators are generated for each case reducer function
export const { addList,dislike,getSocket,getUser,like,login,logout,removeList,emptyUnread,incUnread} = userSlice.actions

export default userSlice.reducer

