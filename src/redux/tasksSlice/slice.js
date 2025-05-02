import { createSlice } from '@reduxjs/toolkit';
import { formatDuration } from '../../utils/formatDuration';
import { TASK_STATUSES } from '../../constans/statuses';

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
        [TASK_STATUSES.IN_PROGRESS]: () => {
          if (task.attempts === null) {
            slice.caseReducers.initializeAttempts(state, { payload: id });

            task.workPeriods = task.workPeriods || [];
            task.workPeriods.push({ start: new Date().toISOString(), end: null });
          }
          task.startWorkTime = new Date().toISOString();
        },
        [TASK_STATUSES.PAUSED]: () => {
          if (task.startWorkTime) {
            slice.caseReducers.countTimeForWork(state, { payload: id });
          }
        },
        [TASK_STATUSES.COMPLETED]: () => {
          if (task.startWorkTime) {
            slice.caseReducers.countTimeForWork(state, { payload: id });
          }
        },
        [TASK_STATUSES.RESUMED]: () => {
          task.workPeriods.push({ start: new Date().toISOString(), end: null });
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

    editTask: (state, action) => {
      if (action.payload && action.payload.id && action.payload.title) {
        state.tasks = state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, title: action.payload.title } : task
        );
      }
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
