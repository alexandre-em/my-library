import { createSlice } from '@reduxjs/toolkit';

import createReducers from '../createReducers';

export const initialState = {
  search: false,
  books: false,
  book: false,
  authors: false,
  author: false,
  user: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: createReducers(initialState),
});

export const { reset, set, update } = loaderSlice.actions;
export default loaderSlice.reducer;
