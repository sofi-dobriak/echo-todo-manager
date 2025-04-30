import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasksSlice';
import { filtersReducer } from './filtersSlice';
import { timerReducer } from './timerSlice';
import { modalsReducer } from './modalSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
    modals: modalsReducer,
    timer: timerReducer,
  },
});
