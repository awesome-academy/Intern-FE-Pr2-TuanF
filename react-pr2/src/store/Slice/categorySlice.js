import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../../api/categoryApi';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoryAPI.fulfilled, (state, action) => {
      state.category = action.payload;
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
