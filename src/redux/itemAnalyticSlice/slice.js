import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisibleItemAnalytic: false,
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
    hideItemAnalytic: () => {
      return initialState;
    },
  },
});

export const { showItemAnalytic, hideItemAnalytic } = slice.actions;
export const itemAnalyticSliceReducer = slice.reducer;
