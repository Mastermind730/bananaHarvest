import { createSlice } from '@reduxjs/toolkit';

// Retrieve user information from sessionStorage
const token = sessionStorage.getItem('token');
const userid = sessionStorage.getItem('userid');
const firstName = sessionStorage.getItem('first_name');
const lastName = sessionStorage.getItem('last_name');
const mobileNo = sessionStorage.getItem('mobile_no');
const role = sessionStorage.getItem('role');

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, action) => {
      // The user is now signed in
      state.status = true;
      state.user = action.payload;

      // Save user information in sessionStorage
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('userid', action.payload.userid);
      sessionStorage.setItem('first_name', action.payload.first_name);
      sessionStorage.setItem('last_name', action.payload.last_name);
      sessionStorage.setItem('mobile_no', action.payload.mobile_no);
      sessionStorage.setItem('role', action.payload.role);
    },
    signout: (state) => {
      // The user is signed out
      state.status = false;
      state.user = null;

      // Remove user information from sessionStorage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userid');
      sessionStorage.removeItem('first_name');
      sessionStorage.removeItem('last_name');
      sessionStorage.removeItem('mobile_no');
      sessionStorage.removeItem('role');
    },
  },
});

// Export the reducer for authSlice
export default authSlice.reducer;

// Export the actions
export const { signin, signout } = authSlice.actions;
