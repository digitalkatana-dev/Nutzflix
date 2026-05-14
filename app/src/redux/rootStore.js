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
import storage from 'redux-persist/lib/storage'; // ✅ correct (localStorage)
import appReducer from './slices/appSlice';
import userReducer from './slices/userSlice';

const resolvedStorage = storage?.default || storage;

const appPersistConfig = {
	key: 'app',
	storage: resolvedStorage,
	whitelist: ['theme'],
};

const userPersistConfig = {
	key: 'user',
	storage: resolvedStorage,
	whitelist: ['activeUser'],
};

export const store = configureStore({
	reducer: {
		app: persistReducer(appPersistConfig, appReducer),
		user: persistReducer(userPersistConfig, userReducer),
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
			},
		}),
});

export const persistor = persistStore(store);
