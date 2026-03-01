import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems.js";

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems.forEach(cartItem => cartItem.amount = 0)
    },
    removeItem: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      cartItem.amount = 0;
    },
    increaseItem: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      cartItem.amount++;
    },
    decreaseItem: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (cartItem.amount !== 0)
        cartItem.amount--;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total.toFixed(2);
    },
  },
});

export const {
  clearCart,
  removeItem,
  increaseItem,
  decreaseItem,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
