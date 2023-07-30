import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../STORE/auth";
import BookReducer from "../STORE/books";
import CartReducer from "../STORE/cart";
import adminReducer from "../STORE/admin";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    Books: BookReducer,
    cart: CartReducer,
    admin: adminReducer,
  },
});
