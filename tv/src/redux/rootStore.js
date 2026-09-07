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
import Reactotron from '../../ReactotronConfig';
import userReducer from './slices/userSlice';
import videoReducer from './slices/videoSlice';

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['activeUser'],
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
        ignoredPaths: [
          'video.movies',
          'video.series',
          'video.lists',
          'video.recentlyAdded',
          'video.favorites',
        ],
      },
      immutableCheck: {
        ignoredPaths: [
          'video.movies',
          'video.series',
          'video.lists',
          'video.recentlyAdded',
          'video.favorites',
        ],
      },
    }),
  enhancers: (getDefaultEnhancers) =>
    __DEV__
      ? getDefaultEnhancers().concat(Reactotron.createEnhancer())
      : getDefaultEnhancers(),
});

export const persistor = persistStore(store);
