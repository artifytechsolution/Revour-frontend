"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: any = {
  authToken: null,
  userData: null,
  searchDetails: null,

  // Simple boolean states
  isLogin: false,
  isSignup: false,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.userData = action.payload;
    },
    removeUser(state) {
      state.userData = null;
    },
    setAuthToken(state, action: PayloadAction<string | null>) {
      state.authToken = action.payload;
    },
    removeAuthToken(state) {
      state.authToken = null;
    },

    // ✅ Persisted search details
    setSearchDetails(state, action: PayloadAction<any>) {
      state.searchDetails = action.payload;
    },
    removeSearchDetails(state) {
      state.searchDetails = null;
    },

    // Simple login state
    setIsLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },

    // Simple signup state
    setIsSignup(state, action: PayloadAction<boolean>) {
      state.isSignup = action.payload;
    },

    // Reset both states
    resetAuthStates(state) {
      state.isLogin = false;
      state.isSignup = false;
    },
  },
});

export const {
  setUser,
  removeUser,
  setAuthToken,
  removeAuthToken,
  setSearchDetails,
  removeSearchDetails,
  setIsLogin,
  setIsSignup,
  resetAuthStates,
} = authSlice.actions;

export default authSlice.reducer;

// Existing selectors
export const selectAuthToken = (state: RootState) =>
  state?.app?.user?.authToken ?? null;

export const selectUser = (state: RootState) =>
  state?.app?.user?.userData ?? null;

export const selectSearchDetails = (state: RootState) =>
  state?.app?.user?.searchDetails ?? null;

// Simple boolean selectors
export const selectIsLogin = (state: RootState) =>
  state?.app?.user?.isLogin ?? false;

export const selectIsSignup = (state: RootState) =>
  state?.app?.user?.isSignup ?? false;
