import { createSlice } from '@reduxjs/toolkit';

// Retrieve user information from localStorage
const token = localStorage.getItem('token');
const userid = localStorage.getItem('userid');
const firstName = localStorage.getItem('first_name');
const lastName = localStorage.getItem('last_name');
const mobileNo = localStorage.getItem('mobile_no');
const role = localStorage.getItem('role');

const initialState = {
  status: !!token, // User is logged in if token exists
  user: token ? {
    token,
    userid,
    first_name: firstName,
    last_name: lastName,
    mobile_no: mobileNo,
    role,
  } : null,
};

// Create an auth slice to maintain the user signin status
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, action) => {
      // The user is now signed in
      state.status = true;
      state.user = action.payload;

      // Save user information in localStorage
      localStorage['token'] = action.payload['token']
      localStorage['userid']= action.payload['userid'];
      localStorage['first_name'] = action.payload['first_name']
      localStorage['last_name'] = action.payload['last_name']
      localStorage['mobile_no'] = action.payload['mobile_no']
      localStorage['role'] = action.payload['role'] 
    },
    signout: (state) => {
      // The user is signed out
      state.status = false;
      state.user = null;

      // Remove user information from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userid');
      localStorage.removeItem('first_name');
      localStorage.removeItem('last_name');
      localStorage.removeItem('mobile_no');
      localStorage.removeItem('role');
    },
  },
});

// Export the reducer for authSlice
export default authSlice.reducer;

// Export the actions
export const { signin, signout } = authSlice.actions;
