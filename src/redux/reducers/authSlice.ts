"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: any = {
  authToken: null,
  userData: null,
  searchDetails: null, // ✅ always null initially, redux-persist will fill it later
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
  },
});

export const {
  setUser,
  removeUser,
  setAuthToken,
  removeAuthToken,
  setSearchDetails,
  removeSearchDetails,
} = authSlice.actions;

export default authSlice.reducer;

export const selectAuthToken = (state: RootState) =>
  state?.app?.user?.authToken ?? null;

export const selectUser = (state: RootState) =>
  state?.app?.user?.userData ?? null;

export const selectSearchDetails = (state: RootState) =>
  state?.app?.user?.searchDetails ?? null;
