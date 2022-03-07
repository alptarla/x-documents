import { configureStore } from '@reduxjs/toolkit'
import documentSlice from './documentSlice'

const store = configureStore({
  reducer: {
    document: documentSlice,
  },
})

export default store
