import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateRange {
  start: string;
  end: string;
}

interface FilterInitialState {
  status: string;
  dateRange: DateRange;
  title: string;
}

const initialState: FilterInitialState = {
  status: '',
  dateRange: { start: '', end: '' },
  title: '',
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateStatusFilter: (state, action: PayloadAction<string>): void => {
      state.status = action.payload;
    },
    resetStatusFilter: (state): void => {
      state.status = '';
    },
    updateDataFilter: (state, action: PayloadAction<DateRange>): void => {
      const { start, end } = action.payload;
      state.dateRange = { start, end };
    },
    resetDataFilter: (state): void => {
      state.dateRange = { start: '', end: '' };
    },
    updateTitleFilter: (state, action: PayloadAction<string>): void => {
      state.title = action.payload;
    },
    resetTitleFilter: (state): void => {
      state.title = '';
    },
    resetFilters: (): FilterInitialState => {
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

export type FilterState = typeof initialState;
