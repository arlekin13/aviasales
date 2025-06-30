import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortBy: 'price',
};
export const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = sortingSlice.actions;
export default sortingSlice.reducer;
