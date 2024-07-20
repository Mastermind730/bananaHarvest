import { createSlice } from '@reduxjs/toolkit';

// Retrieve user information from localStorage
const token = localStorage.getItem('token');

const mobileNo = localStorage.getItem('mobile_no');
const role = localStorage.getItem('role');

const initialState = {
  user: token ? {
    token,

    mobileNo,
    role,
  } : null,
};
// Create an auth slice to maintain the user sign-in status
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, action) => {
      // console.log(action.payload.user)
      // The user is now signed in
      state.status=true;
      state.user = action.payload.user;

      // Save user information in localStorage
      localStorage.setItem('token', action.payload.token);
      // localStorage.setItem('userid', action.payload.userId);
      // localStorage.setItem('first_name', action.payload.firstName);
      // localStorage.setItem('last_name', action.payload.lastName);
      localStorage.setItem('mobile_no', action.payload.user.mobile_no);
      localStorage.setItem('role', action.payload.user.role);
    },
    signout: (state) => {
      // The user is signed out
      state.status=false;

      state.user = null;

      // Remove user information from localStorage
      localStorage.removeItem('token');
     
      localStorage.removeItem('mobile_no');
      localStorage.removeItem('role');
    },
  },
});

// Export the reducer for authSlice
export default authSlice.reducer;

// Export the actions
export const { signin, signout } = authSlice.actions;
