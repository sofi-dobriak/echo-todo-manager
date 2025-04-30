import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: '',
  dateRange: { start: '', end: '' },
  title: '',
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateStatusFilter: (state, action) => {
      state.status = action.payload;
    },
    updateDataFilter: (state, action) => {
      const { start, end } = action.payload;
      state.dateRange = { start, end };
    },
    updateTitleFilter: (state, action) => {
      state.title = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const { updateStatusFilter, updateDataFilter, updateTitleFilter, resetFilters } =
  slice.actions;
export const filtersReducer = slice.reducer;

export const selectFilters = state => state.filters;
