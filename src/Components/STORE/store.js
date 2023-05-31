import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../STORE/auth";
import ProdReducer from "../STORE/data";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    Product: ProdReducer,
  },
});
