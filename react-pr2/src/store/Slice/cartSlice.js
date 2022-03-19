import { createSlice } from '@reduxjs/toolkit';

const cartItemLocalStorage = JSON.parse(localStorage.getItem('cart-list'));

const cartSlice = createSlice({
  name: 'carts',
  initialState: {
    showMiniCart: false,
    cartItem: cartItemLocalStorage || [],
  },
  reducers: {
    toggleMiniCartClick(state, action) {
      state.showMiniCart = action.payload;
    },
    setAddToCart(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItem.findIndex((idx) => idx.id === id);
      if (index >= 0) {
        state.cartItem[index].quantity += quantity;
      } else {
        state.cartItem.push(action.payload);
      }
      localStorage.setItem('cart-list', JSON.stringify(state.cartItem));
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItem.findIndex((idx) => idx.id === id);
      if (index >= 0) {
        state.cartItem[index].quantity = quantity;
      }
      localStorage.setItem('cart-list', JSON.stringify(state.cartItem));
    },
    removeFromCart(state, action) {
      state.cartItem = state.cartItem.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart-list', JSON.stringify(state.cartItem));
    },
    removeMultiple(state, action) {
      state.cartItem = state.cartItem.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart-list', JSON.stringify(state.cartItem));
    },
  },
  extraReducers: (builder) => {},
});

const { reducer, actions } = cartSlice;
export const { removeFromCart, setQuantity, setAddToCart, removeMultiple, toggleMiniCartClick } = actions;
export default reducer;
