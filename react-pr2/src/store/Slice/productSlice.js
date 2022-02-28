import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    product: [],
    isLoading: false,
    filters: {
      _page: 1,
      _limit: 12,
    },
  },
  reducers: {
    setFilter(state, action) {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productAPI.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(productAPI.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const productAPI = createAsyncThunk('products/getAll', async (filter) => {
  try {
    const { data, pagination } = await productApi.getAll(filter);
    return { data, pagination };
  } catch (error) {
    return error;
  }
});

const { reducer } = productSlice;
export default reducer;
