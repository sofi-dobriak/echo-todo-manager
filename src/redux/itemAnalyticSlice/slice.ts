import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types/todoType';

interface ItemsInitialState {
  isVisibleItemAnalytic: boolean;
  currentTask: Task | null;
}

const initialState: ItemsInitialState = {
  isVisibleItemAnalytic: false,
  currentTask: null,
};

const slice = createSlice({
  name: 'itemAnalytic',
  initialState,
  reducers: {
    showItemAnalytic: (state, action: PayloadAction<Task>): void => {
      state.isVisibleItemAnalytic = true;
      state.currentTask = action.payload;
    },
    hideItemAnalytic: (): ItemsInitialState => {
      return initialState;
    },
  },
});

export const { showItemAnalytic, hideItemAnalytic } = slice.actions;
export const itemAnalyticSliceReducer = slice.reducer;
