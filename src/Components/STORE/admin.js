import { configureStore, createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: localStorage.getItem("user").roleId === 1 ? true : false,
  },
  reducers: {
    logout: (state) => {
      state.admin = false;
    },
    login: (state) => {
      state.admin = true;
    },
  },
});

export const adminActions = adminSlice.actions;

export default adminSlice.reducer;
