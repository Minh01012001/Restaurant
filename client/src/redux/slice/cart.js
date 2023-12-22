import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: 0,
  },
  reducers: {
    updateCartTotalQuantity: (state, action) => {
      state.count = action.payload;
    },
    addItemToCart: (state, action) => {},
    updateItemCart: (state, action) => {},
    deleteItemCart: (state, action) => {},
  },
});

export const {
  updateCartTotalQuantity,
  addItemToCart,
  updateItemCart,
  deleteItemCart,
} = cartSlice.actions;

export default cartSlice.reducer;
