import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasksSlice';
import { filtersReducer } from './filtersSlice';
import { timerReducer } from './timerSlice';
import { modalsReducer } from './modalSlice';
import { itemAnalyticSlice } from './itemAnalyticSlice';

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

const persistConfig = {
  key: 'tasks',
  version: 1,
  storage,
};

export const store = configureStore({
  reducer: {
    tasks: persistReducer(persistConfig, tasksReducer),
    filters: filtersReducer,
    modals: modalsReducer,
    timer: timerReducer,
    itemAnalytic: itemAnalyticSlice,
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
