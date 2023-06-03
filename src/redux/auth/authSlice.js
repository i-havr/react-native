import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  login: null,
  userEmail: null,
  avatar: null,
  stateChange: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      ...payload,
      // userId: payload.userId,
      // userEmail: payload.userEmail,
      // login: payload.login,
      // avatar: payload.avatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authLogOut: () => initialState,
  },
});

export default authSlice;
