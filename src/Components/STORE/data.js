import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const List = [
  { id: 1, title: "IBSM FollowUp 1", Source: "Data Source 1", Query: "Teste" },
  { id: 2, title: "IBSM FollowUp 2", Source: "Data Source 2", Query: "Teste" },
  { id: 3, title: "IBSM FollowUp 3", Source: "Data Source 3", Query: "Teste" },
  { id: 4, title: "IBSM FollowUp 4", Source: "Data Source 4", Query: "Teste" },
  { id: 5, title: "IBSM FollowUp 5", Source: "Data Source 5", Query: "Teste" },
  { id: 6, title: "IBSM FollowUp 6", Source: "Data Source 6", Query: "Teste" },
  { id: 7, title: "IBSM FollowUp 7", Source: "Data Source 7", Query: "Teste" },
  { id: 8, title: "IBSM FollowUp 8", Source: "Data Source 8", Query: "Teste" },
  { id: 9, title: "IBSM FollowUp 9", Source: "Data Source 9", Query: "Teste" },
  {
    id: 10,
    title: "IBSM FollowUp 10",
    Source: "Data Source 10",
    Query: "Teste",
  },
];

const ProdSlice = createSlice({
  name: "Product",
  initialState: { Product: List },
  reducers: {
    add: (state, action) => {
      // state.Product.push(action.payload);
      console.log(action);
    },
  },
});

export const ProdActions = ProdSlice.actions;
export const store = configureStore({
  reducer: { Product: ProdSlice.reducer },
});
