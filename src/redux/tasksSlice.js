import { createSelector, createSlice } from '@reduxjs/toolkit';
import { selectFilters } from './filtersSlice';

const initialState = {
  tasks: [],
};

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTasks: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { id, status, dateKey } = action.payload;
      const task = state.tasks.find(task => task.id === id);

      if (task) {
        task.status = status;

        if (dateKey) {
          task[dateKey] = new Date().toISOString();
        }
      }
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    deleteAllTasks: () => {
      return initialState;
    },
  },
});

export const { addTasks, editTask, deleteAllTasks, updateTaskStatus } = slice.actions;
export const tasksReducer = slice.reducer;

export const selectTasks = state => state.tasks.tasks;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectFilters],
  (tasks, filters) => {
    const { status, dateRange, title } = filters;

    return tasks.filter(task => {
      if (status && task.status.toLowerCase() !== status.toLowerCase()) {
        return false;
      }

      if (dateRange.start && dateRange.end) {
        const createDate = new Date(task.createdDate);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);

        if (createDate < startDate || createDate > endDate) {
          return false;
        }
      }

      if (title && !task.title.toLowerCase().includes(title.toLowerCase())) {
        return false;
      }

      return true;
    });
  }
);

export const selectTaskById = (state, id) => {
  return state.tasks.tasks.find(task => task.id === id);
};
