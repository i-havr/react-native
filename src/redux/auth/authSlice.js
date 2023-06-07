import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  login: null,
  userEmail: null,
  avatar: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authLogOut: () => initialState,
  },
});

export const { updateUserProfile, authStateChange, authLogOut } =
  authSlice.actions;
