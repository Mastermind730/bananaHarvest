import { configureStore } from '@reduxjs/toolkit'

// get the slice for auth
import authSlice from './slices/authSlice'
import  HandleUser  from './pages/features/handleUser'


// create a store with required reducers
const store = configureStore({
  reducer: {
    authSlice,
    HandleUser
  
  },
})

export default store
