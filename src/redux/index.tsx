import { configureStore } from '@reduxjs/toolkit'
import saved from './features/saved.slice'
export const store = configureStore({
  reducer: {
    // wishlist,
    saved,
    // cart,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


