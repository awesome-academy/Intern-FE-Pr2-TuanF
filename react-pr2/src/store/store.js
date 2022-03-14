import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Slice/productSlice';
import categoryReducer from './Slice/categorySlice';
import productDetailReducer from './Slice/productDetailSlice';

const rootReducer = {
  products: productReducer,
  categories: categoryReducer,
  productDetail: productDetailReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
