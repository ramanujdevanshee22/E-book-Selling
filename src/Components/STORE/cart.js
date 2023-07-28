import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "Cart",
  initialState: { cart: [], total: 0 },
  reducers: {
    update_cart(state, action) {
      state.cart = action.payload.cart;
      // var temp = 0;
      state.total = 0;
      state.cart.forEach((item) => {
        state.total += item.quantity * item.book.price;
      });
    },
  },
});

export const cartActions = CartSlice.actions;
export default CartSlice.reducer;
