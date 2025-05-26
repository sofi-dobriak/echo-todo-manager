import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import type { Reducer } from '@reduxjs/toolkit';
import { filtersReducer, FilterState } from './filterSlice/slice';
import { tasksReducer, TasksState } from './tasksSlice/slice';
import { modalsReducer } from './modalSlice/slice';
import { itemAnalyticSliceReducer } from './itemAnalyticSlice/slice';

const persistConfigTasks = {
  key: 'tasks',
  version: 1,
  storage,
};

const persistConfigFilters = {
  key: 'filters',
  version: 1,
  storage,
};

const persistedFiltersReducer = persistReducer(
  persistConfigFilters,
  filtersReducer
) as unknown as Reducer<FilterState>;

const persistedTasksReducer = persistReducer(
  persistConfigTasks,
  tasksReducer
) as unknown as Reducer<TasksState>;

export const store = configureStore({
  reducer: {
    tasks: persistedTasksReducer,
    filters: persistedFiltersReducer,
    modals: modalsReducer,
    itemAnalytic: itemAnalyticSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.MODE === 'development',
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
