import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Slice/productSlice';
import categoryReducer from './Slice/categorySlice';

const rootReducer = {
  products: productReducer,
  categories: categoryReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
