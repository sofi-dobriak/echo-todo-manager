import { createSelector, createSlice } from '@reduxjs/toolkit';
import { selectFilters } from './filtersSlice';
import { formattedDateTime } from '../utils/formattedDateTime';
import { formatTime } from '../utils/formatTime';
import { formatDuration } from '../utils/formatDuration';
import { date } from 'yup';

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
      if (!task) return;

      const statusHandlers = {
        'В роботі': () => {
          if (task.attempts === null) {
            slice.caseReducers.initializeAttempts(state, { payload: id });

            task.workPeriods = task.workPeriods || [];
            task.workPeriods.push({ start: new Date().toISOString(), end: null });
          }
          task.startWorkTime = new Date().toISOString();
        },
        Зупинено: () => {
          if (task.startWorkTime) {
            slice.caseReducers.countTimeForWork(state, { payload: id });
          }
        },
        Завершено: () => {
          if (task.startWorkTime) {
            slice.caseReducers.countTimeForWork(state, { payload: id });
          }
        },
        Продовжено: () => {
          task.workPeriods.push({ start: new Date().toISOString(), end: null });
        },
        Видалено: () => {
          slice.caseReducers.checkAllDeleted(state);
        },
      };

      if (statusHandlers[status]) {
        statusHandlers[status]();
      }

      task.status = status;

      if (dateKey) {
        task[dateKey] = new Date().toISOString();
      }
    },

    countTimeForWork: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (!task || !task.workPeriods?.length) return;

      const lastPeriod = task.workPeriods[task.workPeriods.length - 1];
      if (!lastPeriod.end) {
        lastPeriod.end = new Date().toISOString();
      }

      const start = new Date(lastPeriod.start);
      const end = new Date(lastPeriod.end);
      const timeSpentMs = end - start;
      const timeSpentHours = timeSpentMs / (1000 * 60 * 60);

      task.totalTime = (task.totalTime ?? 0) + timeSpentHours;
      task.attempts = task.attempts ?? 1;
      task.averageTime = task.totalTime / task.attempts;

      task.formattedTotalTime = formatDuration(task.totalTime);
      task.formattedAverageTime = formatDuration(task.averageTime);
    },

    checkAllDeleted: state => {
      const allDeleted = state.tasks.every(task => task.status === 'Видалено');
      if (allDeleted) {
        state.tasks.forEach(task => {
          task.attempts = null;
          task.totalTime = null;
          task.averageTime = null;
        });
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

    initializeAttempts: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find(task => task.id === taskId);

      if (task && task.attempts === null) {
        task.attempts = 1;
      }
    },

    countApproachesNumber: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find(task => task.id === taskId);

      if (task) {
        if (task.attempts === null) {
          task.attempts = 1;
        } else {
          task.attempts += 1;
        }
      }
    },
  },
});

export const {
  addTasks,
  editTask,
  deleteAllTasks,
  updateTaskStatus,
  initializeAttempts,
  countApproachesNumber,
  countTimeForWork,
} = slice.actions;

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
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(dateRange.end);
        endDate.setHours(23, 59, 59, 999);

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

export const selectTaskStatusCountsWithDateRange = createSelector(
  [selectTasks, selectFilters],
  (tasks, { dateRange }) => {
    const statuses = [
      { key: 'created', value: 'Створено' },
      { key: 'inProgress', value: 'В роботі' },
      { key: 'continued', value: 'Продовжено' },
      { key: 'stopped', value: 'Зупинено' },
      { key: 'completed', value: 'Завершено' },
      { key: 'deleted', value: 'Видалено' },
    ];

    const statusCount = Object.fromEntries(statuses.map(({ key }) => [key, 0]));

    const start = dateRange.start ? new Date(dateRange.start) : null;
    const end = dateRange.end ? new Date(dateRange.end) : null;
    if (end) end.setHours(23, 59, 59, 999);

    const filtered = tasks.filter(task => {
      if (!start || !end) return true;
      const taskDate = new Date(task.createdDate);
      return taskDate >= start && taskDate <= end;
    });

    filtered.forEach(task => {
      const match = statuses.find(status => status.value === task.status);
      if (match) statusCount[match.key]++;
    });

    return statusCount;
  }
);
