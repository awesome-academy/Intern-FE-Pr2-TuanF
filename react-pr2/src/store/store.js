import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Slice/productSlice';
import categoryReducer from './Slice/categorySlice';
import productDetailReducer from './Slice/productDetailSlice';
import cartReducer from './Slice/cartSlice';

const rootReducer = {
  products: productReducer,
  categories: categoryReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
