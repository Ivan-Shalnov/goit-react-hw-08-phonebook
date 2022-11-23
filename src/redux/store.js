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
import { configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/slice';

import { contactsReducer } from './contacts/slice';
import { filterReducer } from './filter/slice';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};
const persistedReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    contacts: contactsReducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
