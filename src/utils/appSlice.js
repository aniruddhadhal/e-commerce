import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    products: [],
    cart: [],
    itemToDisplay: "",
    totalCart: 0,
  },
  reducers: {
    // Add_products reducer updates the 'products' state with the new products array
    Add_products: (state, action) => {
      state.products = action.payload; // Assuming action.payload is an array of products
    },
  },
});

export const { Add_products } = appSlice.actions;
export default appSlice.reducer;
