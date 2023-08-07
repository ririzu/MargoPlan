import { createSlice } from "@reduxjs/toolkit";

import {
  getUsers,
  registerUser,
  loginUser,
  getUserProfile,
  updateUser,
  deleteUser,
} from "./userActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  allUsers: null,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    logout: (state) => {
      localStorage.removeItem("userToken"); // delete token from storage
      state.loading = false;
      state.allUsers = null;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {

    // get all users details
    [getUsers.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allUsers = payload;
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = 'User has been Registered Successfully!';
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload+' register';
    },

    // login user
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
      state.userToken = payload.userToken;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload+' login';
    },

    // get user details
    [getUserProfile.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [getUserProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    },
    [getUserProfile.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    // update user details
    [updateUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = 'User Profile has been Updated Successfully!';
      state.userInfo = payload;
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload+' profile';
    },

    // remove user details
    [deleteUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = true;
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
