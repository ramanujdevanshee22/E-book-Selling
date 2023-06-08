import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../STORE/auth";
import BookReducer from "../STORE/books";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    Books: BookReducer,
  },
});
