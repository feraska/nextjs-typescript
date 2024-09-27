import { configureStore } from '@reduxjs/toolkit'
import genreReducer from "@/redux/slices/genre"
import notificationReducer from "@/redux/slices/notification"
import userReducer from "@/redux/slices/user"
import { createWrapper } from 'next-redux-wrapper';
export const makeStore = () => {
  return configureStore({
    reducer: {
      genre:genreReducer,
      notification:notificationReducer,
      user:userReducer

    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export const wrapper = createWrapper(makeStore);
