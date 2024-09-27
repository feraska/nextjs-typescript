
import User from '@/interfaces/user'
import { createSlice } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'


export interface CounterState {
  user?: User,
  login:number,
  socket?:Socket
}

const initialState: CounterState = {
    user:undefined,
    login:2,
    socket:undefined
    
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getSocket: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.socket = action.payload
    },
    login: (state,action) => {
        state.login = action.payload
    },
    logout: (state,action) => {
        state.login = 2
        state.user = undefined
        state.socket = undefined
    },
    getUser: (state,action) => {
        state.user = action.payload
    },
    // getLikes: (state,action) => {
    //     if(!state.user) {
    //         return
    //     }
    // //    const prev = {...state.user}
    // //    prev.likes = action.payload
    //    state.user.likes = [...action.payload]
    // //    state.user = {...prev}
    // },
    like: (state,action) => {
        if(!state.user) {
            return
        }
    //    const prev = {...state.user}
    //    prev.likes = action.payload
       state.user.likes = [...state.user.likes,action.payload]
    //    state.user = {...prev}
    },
    
    dislike: (state,action) => {
        if(!state.user) {
            return
        }
    //    const prev = {...state.user}
    //    prev.likes = action.payload
       state.user.likes = [...state.user.likes.filter((value)=>value!==action.payload)]
    //    state.user = {...prev}
    },
    // getList: (state,action) => {
    //     if(!state.user) {
    //         return
    //     }
    // //    const prev = {...state.user}
    // //    prev.likes = action.payload
    //    state.user.list = [...action.payload]
    // //    state.user = {...prev}
    // },
    
  //},
  addList: (state,action) => {
    if(!state.user) {
        return
    }
//    const prev = {...state.user}
//    prev.likes = action.payload
   state.user.list = [...state.user.list,action.payload]
//    state.user = {...prev}
},
removeList: (state,action) => {
    if(!state.user) {
        return
    }
//    const prev = {...state.user}
//    prev.likes = action.payload
state.user.list = [...state.user.list.filter((value)=>value!==action.payload)]
//    state.user = {...prev}
},
  }
})

// Action creators are generated for each case reducer function
export const { addList,dislike,getSocket,getUser,like,login,logout,removeList} = notificationSlice.actions

export default notificationSlice.reducer

