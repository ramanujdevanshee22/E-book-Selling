import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { auth: false },
  reducers: {
    logout: (state) => {
      state.auth = false;
    },
    login: (state) => {
      state.auth = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
