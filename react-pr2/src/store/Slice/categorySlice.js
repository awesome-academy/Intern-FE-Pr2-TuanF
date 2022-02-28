import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../../api/categoryApi';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(categoryAPI.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(categoryAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload;
      })
      .addCase(categoryAPI.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const categoryAPI = createAsyncThunk('category/getAll', async () => {
  try {
    const res = await categoryApi.getAll();
    return res;
  } catch (error) {
    return error;
  }
});

const { reducer } = categorySlice;
export default reducer;
