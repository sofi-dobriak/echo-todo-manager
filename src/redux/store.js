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
import { filtersReducer } from './filterSlice/slice';
import { tasksReducer } from './tasksSlice/slice';
import { modalsReducer } from './modalSlice/slice';
import { itemAnalyticSliceReducer } from './itemAnalyticSlice/slice';

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
