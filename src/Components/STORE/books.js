import { createSlice } from "@reduxjs/toolkit";

const BookSlice = createSlice({
  name: "Books",
  initialState: { Books: [] },
  reducers: {
    all_books(state, action) {
      // console.log(action.payload.arrBooks);
      state.Books = action.payload.arrBooks;
    },
  },
});

export const { all_books } = BookSlice.actions;
export default BookSlice.reducer;
