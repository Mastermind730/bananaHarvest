import { createSlice } from '@reduxjs/toolkit';

// Create an auth slice to maintain the user signin status
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: false, // User is not logged in
    user: null, // User object to store user information including role
  },
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
