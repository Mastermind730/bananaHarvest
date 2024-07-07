import { createSlice } from '@reduxjs/toolkit'

// create an auth slice to maintain the user signin status
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // user is not logged in
    status: false,
  },
  reducers: {
    signin: (state, action) => {
      // the user is now signed in
      state.status = true

    
      sessionStorage['token'] = action.payload['token']
      sessionStorage['userid'] = action.payload['userid']
      sessionStorage['first_name'] = action.payload['first_name']
      sessionStorage['last_name'] = action.payload['last_name']
      sessionStorage['mobile_no'] = action.payload['mobile_no']
      sessionStorage['role'] = action.payload['role'] 

    },
    signout: (state, action) => {
      // the user is signed out
      state.status = false

      // remove the user token and name from sessionStorage
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userid')
      sessionStorage.removeItem('first_name')
      sessionStorage.removeItem('last_name')
      sessionStorage.removeItem('mobile_no')
      sessionStorage.removeItem('role')
    },
  },
})

// export the reducer for authSlice
export default authSlice.reducer

// export the actions
export const { signin, signout } = authSlice.actions
