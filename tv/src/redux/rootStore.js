import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slices/userSlice';
import videoReducer from './slices/videoSlice';

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['activeUser', 'allUsers'],
};

const videoPersistConfig = {
  key: 'video',
  storage: AsyncStorage,
  whitelist: [
    'lastFetched',
    'featured',
    'selectedVideo',
    'selectedSeries',
    'selectedSeason',
  ],
};

export const store = configureStore({
  reducer: {
    user: persistReducer(userPersistConfig, userReducer),
    video: persistReducer(videoPersistConfig, videoReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

export const persistor = persistStore(store);
