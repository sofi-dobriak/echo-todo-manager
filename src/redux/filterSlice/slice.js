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
    resetStatusFilter: state => {
      state.status = '';
    },
    updateDataFilter: (state, action) => {
      const { start, end } = action.payload;
      state.dateRange = { start, end };
    },
    resetDataFilter: state => {
      state.dateRange = { start: '', end: '' };
    },
    updateTitleFilter: (state, action) => {
      state.title = action.payload;
    },
    resetTitleFilter: state => {
      state.title = '';
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  updateStatusFilter,
  resetStatusFilter,
  updateDataFilter,
  resetDataFilter,
  updateTitleFilter,
  resetTitleFilter,
  resetFilters,
} = slice.actions;

export const filtersReducer = slice.reducer;
