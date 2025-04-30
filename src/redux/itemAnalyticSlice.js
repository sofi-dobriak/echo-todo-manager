import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisibleItemAnalityc: false,
  currentTask: null,
};

const slice = createSlice({
  name: 'itemAnalytic',
  initialState,
  reducers: {
    showItemAnalytic: (state, action) => {
      state.isVisibleItemAnalityc = true;
      state.currentTask = action.payload;
    },
    hideItemAnalytic: state => {
      state.isVisibleItemAnalityc = false;
      state.currentTask = null;
    },
  },
});

export const { showItemAnalytic, hideItemAnalytic } = slice.actions;
export const itemAnalyticSlice = slice.reducer;
